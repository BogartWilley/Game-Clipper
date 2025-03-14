import { obs } from '../connection/connect';
import { handleErrors } from '../actions/handleErrors';
import { getSelectedGame } from '../actions/selectGame';

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
export const createNewScene = async () => {
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

export const changeScene = async () => {
  try {
    const selectedGame = await getSelectedGame();
    await obs.call('SetCurrentProgramScene', {
      sceneName: `${selectedGame.fullName} Replay`,
    });
  } catch (err) {
    handleErrors(err);
  }
};
