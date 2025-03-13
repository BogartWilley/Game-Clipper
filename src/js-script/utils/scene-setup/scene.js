import { obs } from '../connection/connect.js';
import handleErrors from '../actions/handleErrors.js';
import { getSelectedGame } from '../actions/selectGame.js';
import { resizeWindow } from '../actions/resizeWindow.js';

const getSceneName = async () => {
  try {
    const currentScene = await obs.call('GetCurrentProgramScene');
    console.log('This is the current selected scene : ');
    console.log(currentScene);
  } catch (err) {
    console.log("Couldn't find the selected scene");
    handleErrors(err);
  }
};
const createNewScene = async () => {
  try {
    const selectedGame = await getSelectedGame();
    await obs.call('CreateScene', {
      sceneName: `${selectedGame.fullName} Replay`,
    });
    await obs.call('SetCurrentProgramScene', {
      sceneName: `${selectedGame.fullName} Replay`,
    });
  } catch (err) {
    handleErrors(err, createNewScene);
  }
};

const changeScene = async () => {
  try {
    const selectedGame = await getSelectedGame();
    await obs.call('SetCurrentProgramScene', {
      sceneName: `${selectedGame.fullName} Replay`,
    });
  } catch (err) {
    handleErrors(err);
  }
};

module.exports = {
  getSceneName,
  createNewScene,
  changeScene,
};
