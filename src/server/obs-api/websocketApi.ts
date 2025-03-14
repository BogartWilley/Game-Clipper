import { OBSEventTypes, OBSResponseTypes } from 'obs-websocket-js';

import { obs } from '../utils/connection/connect';
import { createNewScene } from '../utils/scene-setup/scene';
import {
  isSourcePresent,
  audioSetup,
  videoSetup,
} from '../utils/scene-setup/capture';
import { handleErrors } from '../utils/actions/handleErrors';
import { getSelectedGame } from '../utils/actions/selectGame';
obs.on('ExitStarted', () => {
  console.log('Now exiting...');
  try {
    process.exit();
  } catch (err) {
    handleErrors(err);
  }
});

obs.on('Identified', () => {
  try {
    // Assures that the program is ready to process requests
    setTimeout(async () => {
      const selectedGame = getSelectedGame();
      console.log('Connected to OBS WebSocket');
      await createNewScene();
      const sources = await isSourcePresent();
      if (!sources) {
        console.log('Creating Input Sources...');
        await audioSetup();
        await videoSetup();
      }
      const alertServer = fetch('http://localhost:4609/obs-ready', {
        method: 'GET',
      });
    }, 1000);
  } catch (err) {
    handleErrors(err);
  }
});

setInterval(async () => {
  try {
  } catch (err) {
    handleErrors(err);
  }
}, 500);

obs.on(
  'RecordStateChanged',
  async (state: OBSEventTypes['RecordStateChanged']) => {
    if (state.outputActive == false && state.outputPath != null) {
      console.log(state);
      const outputState = await obs.call('GetRecordStatus');
      if (outputState) console.log(outputState);
      const response = await fetch('http://localhost:4609/parse-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: state.outputPath,
          disconnected: process.env.REPLAY_DISCONNECTED,
        }),
      });
      if (response.ok)
        console.log(`Recording saved successfully in ${state.outputPath}`);
      // Saved replay conversion initated, alert IPC
    }
  },
);

export { obs };
