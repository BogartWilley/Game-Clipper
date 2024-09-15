const { obs } = require('../connection/connect');
const { getSelectedGame } = require('./selectGame');
async function resizeWindow() {
  const selectedGame = getSelectedGame();

  const sceneId = await obs.call('GetSceneItemId', {
    sourceName: `${selectedGame.name} Video Capture`,
    sceneName: `${selectedGame.fullName} Replay`,
  });
  const sceneProperties = await obs.call('GetSceneItemTransform', {
    sceneItemId: sceneId.sceneId,
    sceneName: `${selectedGame.fullName} Replay`,
  });

  console.log(sceneProperties);

  const scaleFactor = 1080 / 1440; // TODO - RETRIEVE WINDOW'S RESOLUTION AND USE IT HERE
  const scaleSourceTo1080 = await obs.call('SetSceneItemTransform', {
    sceneName: `${selectedGame.fullName} Replay`,
    sceneItemId: sceneId.sceneId,
    sceneItemTransform: { scaleX: scaleFactor, scaleY: scaleFactor }, // "Object containing scene item transform info to update"
  });
}
module.exports = { resizeWindow };
