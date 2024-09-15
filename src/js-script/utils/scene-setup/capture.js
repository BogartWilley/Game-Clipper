const { obs } = require('../connection/connect.js');
const handleErrors = require('../actions/handleErrors.js');
const { updateSelectedGame } = require('../actions/selectGame.js');

const audioSetup = async () => {
  try {
    const selectedGame = updateSelectedGame();
    const audio = await obs.call('CreateInput', {
      sceneName: `${selectedGame.fullName} Replay`,
      inputName: `${selectedGame.name} Audio Capture`,
      inputKind: 'wasapi_process_output_capture',
      inputSettings: {
        window: selectedGame.windowId,
      },
      sceneItemEnabled: true,
    });
  } catch (err) {
    handleErrors(err);
  }
};

const videoSetup = async () => {
  const selectedGame = updateSelectedGame();
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

    const getSceneItemId = await obs.call('GetSceneItemId', {
      sceneName: `${selectedGame.fullName} Replay`,
      sourceName: `${selectedGame.name} Video Capture`,
    });

    const scaleFactor = 1080 / 1440; // TODO - RETRIEVE WINDOW'S RESOLUTION AND USE IT HERE
    const scaleSourceTo1080 = await obs.call('SetSceneItemTransform', {
      sceneName: `${selectedGame.fullName} Replay`,
      sceneItemId: getSceneItemId.sceneItemId,
      sceneItemTransform: { scaleX: scaleFactor, scaleY: scaleFactor },
    });

    const setVideoSettings = await obs.call('SetVideoSettings', {
      baseHeight: 1080,
      baseWidth: 1920,
      fpsDenominator: 1,
      fpsDenominator: 60,
      outputHeight: 1080,
      outputWidth: 1920,
    });
  } catch (err) {
    handleErrors(err);
  }
};

//  ---------- TESTING FUNCTIONS ----------
const logSettings = async (type) => {
  try {
    const selectedGame = updateSelectedGame();
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
