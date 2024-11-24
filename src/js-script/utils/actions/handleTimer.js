const { BrowserWindow } = require('electron');
const { obs } = require('../connection/connect');
const { recordingAction, stopRecording } = require('./recording');
const handleErrors = require('./handleErrors');
async function handleTimer(state) {
  try {
    const mainWindow = BrowserWindow.getAllWindows()[0];
    if (mainWindow) {
      mainWindow.webContents.send(`${state}-timer`); // Send the message to the renderer process
    }
    if (state === 'start') {
      const interval = setInterval(async () => {
        const status = await obs.call('GetRecordStatus');
        console.log('This is the current status');
        console.log(status);
        if (status.outputActive === false) {
          clearInterval(interval);
        }
        // If it's longer than 6:59 mintues
        if (status.outputDuration > 7 * 60 * 1000 - 1000) {
          process.env.REPLAY_DISCONNECTED = true;
          await obs.call('StopRecord');
          handleTimer('stop');
        }
      }, 60 * 1000);
    }
  } catch (error) {
    clearInterval(interval);
    handleErrors(error);
  }
}

module.exports = { handleTimer };
