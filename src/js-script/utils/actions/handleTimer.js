const { BrowserWindow } = require('electron');
const { obs } = require('../connection/connect');
const { recordingAction, stopRecording } = require('./recording');
const handleErrors = require('./handleErrors');

let isRecordingRunning = false;

// Helper function to change recording running's state from outside
function setRecoridngRunning(state) {
  if (state !== undefined) isRecordingRunning = state;
  console.log(`currently is recording is ${isRecordingRunning}`);
  return isRecordingRunning;
}

async function handleTimer(state) {
  const mainWindow = BrowserWindow.getAllWindows()[0];
  mainWindow.webContents.send(`${state}-timer`); // Sets the timer component's state in React
  try {
    if (state === 'start') {
      setRecoridngRunning(true);
      const interval = setInterval(async () => {
        const status = await obs.call('GetRecordStatus');
        console.log('This is the current status');
        console.log(status);
        if (status.outputActive === false) {
          clearInterval(interval);
        }
        // If the recording is longer than 6:59 mintues
        if (status.outputDuration > 7 * 60 * 1000 - 1000) {
          process.env.REPLAY_DISCONNECTED = true;
          await obs.call('StopRecord');
          mainWindow.webContents.send(`stop-timer`);
          // TODO - FIGURE OUT A WAY TO DISPLAY THE PROPER CLOSING MESSAGE UNTIL THE REPLAY HAS FINISHED PROCESSING
        }
      }, 60 * 1000);
    }
  } catch (error) {
    clearInterval(interval);
    handleErrors(error);
  }
}

module.exports = { handleTimer, setRecoridngRunning };
