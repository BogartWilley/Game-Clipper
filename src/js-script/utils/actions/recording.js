const { BrowserWindow } = require('electron');

const { obs } = require('../connection/connect');
const handleErrors = require('./handleErrors');

function handleTimer(state) {
  const mainWindow = BrowserWindow.getAllWindows()[0];
  if (mainWindow) {
    mainWindow.webContents.send(`${state}-timer`); // Send the message to the renderer process
  }
}

async function recordingAction(action, cb, res) {
  try {
    const status = await cb();
    if (!status) {
      console.log(`Failed to ${action} the recording.`);
      if (res)
        res.status(500).send({ message: `Failed to ${action} the recording` });
      return;
    }
    console.log(status);
    if (res)
      res.status(200).send({
        message: `OBS successfully was able to successfully ${action} the recording!`,
      });
  } catch (err) {
    console.log(`Failed to ${action} the recording.`);
    if (res)
      res.status(500).send({ message: `Failed to ${action} the recording` });
  }
}

const startRecording = async () => {
  try {
    const start = await obs.call('StartRecord');
    // Wait 1 second to check if the recording started
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const status = await obs.call('GetRecordStatus');
    if (status.outputActive && status.outputDuration !== 0) {
      console.log('Recording has started');
      handleTimer('start');
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Error starting recording:', err);
    return false;
  }
};

const pauseRecording = async () => {
  try {
    const pause = await obs.call('PauseRecord');
    console.log('Pause the recording');
    return true;
  } catch (err) {
    console.log('Failed to pause recording');
    handleErrors(err);
    return false;
  }
};
const resumeRecording = async () => {
  try {
    const resume = await obs.call('ResumeRecord');
    console.log('Resume the recording');
    return true;
  } catch (err) {
    console.log('Failed to resume recording');
    handleErrors(err);
    return false;
  }
};
const stopRecording = async () => {
  try {
    const stop = await obs.call('StopRecord');
    handleTimer('stop');
    console.log('Stopped the recording');
    return true;
  } catch (err) {
    console.log('Failed to stop recording');
    handleErrors(err);
    return false;
  }
};

module.exports = {
  startRecording,
  pauseRecording,
  resumeRecording,
  stopRecording,
  recordingAction,
};
