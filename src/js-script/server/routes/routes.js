const express = require('express');
const router = express.Router();
const {
  startRecording,
  pauseRecording,
  resumeRecording,
  stopRecording,
  recordingAction,
} = require('../../utils/actions/recording');
const handleErrors = require('../../utils/handleErrors');
const authenticate = require('../middlewares/authenticate');

router.get('/obs-ready', (req, res) => {
  console.log('OBS is now ready!');
  res.status(200).send({ message: 'OBS is now ready!' });
});

router.get('/start-recording', async (req, res) => {
  try {
    await recordingAction('start', startRecording, res);
  } catch (err) {
    console.log('Failed to start the recording');
    handleErrors(err);
  }
});

router.get('/stop-recording', async (req, res) => {
  try {
    await recordingAction('stop', stopRecording, res);
  } catch (err) {
    console.log('Failed to stop the recording');
    handleErrors(err);
  }
});

router.get('/pause-recording', async (req, res) => {
  try {
    await recordingAction('pause', pauseRecording, res);
  } catch (err) {
    console.log('Failed to pause the recording');
    handleErrors(err);
  }
});
router.get('/resume-recording', async (req, res) => {
  try {
    await recordingAction('resume', resumeRecording, res);
  } catch (err) {
    console.log('Failed to resume the recording');
    handleErrors(err);
  }
});

router.all('*', (req, res) => {
  res.status(400).send({ message: 'Bad Request' });
});
module.exports = router;
