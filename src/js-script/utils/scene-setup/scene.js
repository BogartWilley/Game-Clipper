const { obs } = require('../connection/connect.js');
const handleErrors = require('../actions/handleErrors.js');
const { getSelectedGame } = require('../actions/selectGame.js');

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
