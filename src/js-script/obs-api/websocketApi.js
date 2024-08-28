const { obs } = require('../utils/connection/connect.js');
const { createNewScene } = require('../utils/scene-setup/scene.js');
const {
  isSourcePresent,
  audioSetup,
  videoSetup,
  logSettings,
} = require('../utils/scene-setup/capture.js');
const handleErrors = require('../utils/handleErrors.js');
const { updateSelectedGame } = require('../utils/selectedGame.js');
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
      const selectedGame = updateSelectedGame();
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

obs.on('RecordStateChanged', (state) => {
  if (state.outputActive == false && state.outputPath != null) {
    console.log(state);
  }
  // Saved replay conversion initated, alert IPC
});
obs.on('ReplayBufferSaved', (buff) => {
  console.log('This is the replay buffer : ');
  console.log(buff);
});

obs.on('InputCreated', () => {
  logSettings('video');
  logSettings('audio');
  console.log('input created ');
});

module.exports = { obs };
