const { BrowserWindow } = require('electron');
const { obs } = require('../connection/connect');
const { recordingAction, stopRecording } = require('./recording');
const handleErrors = require('./handleErrors');

let isTimerRunning = false;

function checkTimer() {
  return isTimerRunning;
}

async function handleTimer(state) {
  const mainWindow = BrowserWindow.getAllWindows()[0];
  mainWindow.webContents.send(`${state}-timer`); // Sets the timer component's state in React
  try {
    if (state === 'start') {
      isTimerRunning = true;
      const interval = setInterval(async () => {
        const status = await obs.call('GetRecordStatus');
        console.log('This is the current status');
        console.log(status);
        if (status.outputActive === false) {
          clearInterval(interval);
        }
        // If the recording longer than 6:59 mintues
        if (status.outputDuration > 7 * 60 * 1000 - 1000) {
          process.env.REPLAY_DISCONNECTED = true;
          await obs.call('StopRecord');
          mainWindow.webContents.send(`stop-timer`);
          handleTimer('stop');
          // TODO - FIGURE OUT A WAY TO DISPLAY THE PROPER CLOSING MESSAGE UNTIL THE REPLAY HAS FINISHED PROCESSING
        }
      }, 60 * 1000);
    } else {
      isTimerRunning = false;
    }
  } catch (error) {
    clearInterval(interval);
    handleErrors(error);
  }
}

module.exports = { handleTimer, checkTimer };
