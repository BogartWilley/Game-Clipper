const { obs } = require('../connection/connect.js');
const handleErrors = require('../actions/handleErrors.js');
const { getSelectedGame } = require('../actions/selectGame.js');
const { muteInputs } = require('../actions/muteInputs.js');
const { resizeWindow } = require('../actions/resizeWindow.js');

const audioSetup = async () => {
  try {
    const selectedGame = getSelectedGame();
    const audio = await obs.call('CreateInput', {
      sceneName: `${selectedGame.fullName} Replay`,
      inputName: `${selectedGame.name} Audio Capture`,
      inputKind: 'wasapi_process_output_capture',
      inputSettings: {
        window: selectedGame.windowId,
      },
      sceneItemEnabled: true,
    });
    muteInputs(selectedGame);
  } catch (err) {
    handleErrors(err);
  }
};

const videoSetup = async () => {
  const selectedGame = getSelectedGame();
  try {
    const video = await obs.call('CreateInput', {
      sceneName: `${selectedGame.fullName} Replay`,
      inputName: `${selectedGame.name} Video Capture`,
      inputKind: 'game_capture',
      inputSettings: {
        capture_mode: 'window',
        window: selectedGame.windowId,
        window_match_priority: true,
        window_priority: 0,
      },
      sceneItemEnabled: true,
    });

    const setVideoSettings = await obs.call('SetVideoSettings', {
      baseHeight: 1080,
      baseWidth: 1920,
      fpsDenominator: 1,
      fpsDenominator: 60,
      outputHeight: 1080,
      outputWidth: 1920,
    });
    setTimeout(resizeWindow, 500); // otherwise,the sceneItemTransform objects is going to be empty   -- TODO -- Fix this
  } catch (err) {
    handleErrors(err);
  }
};

//  ---------- TESTING FUNCTIONS ----------
const logSettings = async (type) => {
  try {
    const selectedGame = getSelectedGame();
    if (type === 'video') {
      const video = await obs.call('GetInputSettings', {
        inputName: `${selectedGame.fullName} Video Capture`,
      });
      console.log(video);
      return;
    }
    if (type === 'audio') {
      const audio = await obs.call('GetInputSettings', {
        inputName: `${selectedGame.fullName} Audio Capture`,
      });
      console.log(audio);
    }
  } catch (err) {
    handleErrors(err);
  }
};

const isSourcePresent = async () => {
  try {
    await obs.call('GetInputSettings', {
      inputName: `${selectedGame.name} Video Capture`,
    });
    await obs.call('GetInputSettings', {
      inputName: `${selectedGame.name} Audio Capture`,
    });
    return true; // Both sources are present
  } catch (err) {
    handleErrors(err);
    return false;
  }
};

module.exports = {
  audioSetup,
  videoSetup,
  logSettings,
  isSourcePresent,
};
