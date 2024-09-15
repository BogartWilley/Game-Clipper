const express = require('express');
const router = express.Router();
const {
  startRecording,
  pauseRecording,
  resumeRecording,
  stopRecording,
  recordingAction,
} = require('../../utils/actions/recording');
const handleErrors = require('../../utils/actions/handleErrors');
const authenticate = require('../middlewares/authenticate');
const { getSelectedGame } = require('../../utils/actions/selectGame');
const {
  createNewScene,
  changeScene,
} = require('../../utils/scene-setup/scene');
const { audioSetup, videoSetup } = require('../../utils/scene-setup/capture');
// Process Action

router.get('/obs-ready', (req, res) => {
  console.log('OBS is now ready!');
  res.status(200).send({ message: 'OBS is now ready!' });
});

router.get('/process-kill', (req, res) => {
  console.log('Process was killed,updating the state : ');
  res.status(200).send({ message: 'Process was killed' });
});

router.get('/change-game', async (req, res) => {
  try {
    const selectedGame = await getSelectedGame();

    // CHECK IF THERE'S ALREADY A SCENE, IF NOT THEN CREATE AND SETUP ONE

    await createNewScene();
    await audioSetup();
    await videoSetup();
    await changeScene();
    res.status(200).send({
      message: `Current game changed successfully,it is now ${selectedGame.name}`,
    });
  } catch (err) {
    console.log('Failed to change the game');
    handleErrors(err);
  }
});
// Recording Actions
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

module.exports = router;
