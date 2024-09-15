const { obs } = require('../utils/connection/connect.js');
const { createNewScene } = require('../utils/scene-setup/scene.js');
const {
  isSourcePresent,
  audioSetup,
  videoSetup,
  logSettings,
} = require('../utils/scene-setup/capture.js');
const handleErrors = require('../utils/actions/handleErrors.js');
const { getSelectedGame } = require('../utils/actions/selectGame.js');
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
obs.on('RecordStateChanged', async (state) => {
  if (state.outputActive == false && state.outputPath != null) {
    console.log(state);
    const outputState = await obs.call('GetRecordStatus');
    if (outputState) console.log(outputState);
    const response = await fetch('http://localhost:4609/get-output-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: state.outputPath,
      }),
    });
    if (response.ok)
      console.log(`Recording saved successfully in ${state.outputPath}`);
  } else {
    console.log('Encountered an error');
  }
  // Saved replay conversion initated, alert IPC
});
obs.on('ReplayBufferSaved', (buff) => {
  console.log('This is the replay buffer : ');
  console.log(buff);
});

obs.on('InputCreated', async () => {});

module.exports = { obs };
