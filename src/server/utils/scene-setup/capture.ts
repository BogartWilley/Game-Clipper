import { obs } from '../connection/connect';
import { handleErrors } from '../actions/handleErrors';
import { GameInfo, getSelectedGame } from '../actions/selectGame';
import { muteInputs } from '../actions/muteInputs';
import { resizeWindow } from '../actions/resizeWindow';

export const audioSetup = async () => {
  try {
    const selectedGame: GameInfo = getSelectedGame();
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

export const videoSetup = async () => {
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
const logSettings = async (type: string) => {
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

export const isSourcePresent = async () => {
  try {
    const selectedGame = getSelectedGame();
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
