import { Request, Response, Router } from 'express';
import express from 'express';
import {
  startRecording,
  pauseRecording,
  resumeRecording,
  stopRecording,
  recordingAction,
} from '../../utils/actions/recording';
import { handleErrors } from '../../utils/actions/handleErrors';
import { getSelectedGame } from '../../utils/actions/selectGame';
import { createNewScene, changeScene } from '../../utils/scene-setup/scene';
import { audioSetup, videoSetup } from '../../utils/scene-setup/capture';
import { resizeWindow } from '../../utils/actions/resizeWindow';

const router = Router();
// Recording Actions
router.get('/start-recording', async (req: Request, res: Response) => {
  try {
    resizeWindow();
    await recordingAction('start', startRecording, res);
  } catch (err) {
    console.log('Failed to start the recording');
    handleErrors(err);
  }
});

router.get('/stop-recording', async (req: Request, res: Response) => {
  try {
    const disconnected =
      req.headers['disconnected'] === 'true' ? 'true' : 'false';
    process.env.REPLAY_DISCONNECTED = disconnected;
    await recordingAction('stop', stopRecording, res);
  } catch (err) {
    console.log('Failed to stop the recording');
    handleErrors(err);
  }
});

router.get('/pause-recording', async (req: Request, res: Response) => {
  try {
    await recordingAction('pause', pauseRecording, res);
  } catch (err) {
    console.log('Failed to pause the recording');
    handleErrors(err);
  }
});
router.get('/resume-recording', async (req: Request, res: Response) => {
  try {
    await recordingAction('resume', resumeRecording, res);
  } catch (err) {
    console.log('Failed to resume the recording');
    handleErrors(err);
  }
});

// Process Action

router.get('/obs-ready', (req: Request, res: Response) => {
  console.log('OBS is now ready!');
  res.status(200).send({ message: 'OBS is now ready!' });
});

router.get('/process-kill', (req: Request, res: Response) => {
  console.log('Process was killed,updating the state : ');
  res.status(200).send({ message: 'Process was killed' });
});

router.get('/change-game', async (req: Request, res: Response) => {
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
    res.status(500).send({
      message: `Failed to change the game`,
    });
  }
});

router.get('/resize-window', (req: Request, res: Response) => {
  try {
    resizeWindow();
    res.send(200);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
});

export default router;
