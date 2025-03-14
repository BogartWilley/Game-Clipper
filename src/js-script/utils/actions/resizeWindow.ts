import { OBSResponseTypes } from 'obs-websocket-js';
import { obs } from '../connection/connect';
import { handleErrors } from './handleErrors';
import { getSelectedGame } from './selectGame';

export async function resizeWindow() {
  try {
    const selectedGame = getSelectedGame();

    const sceneId = await obs.call('GetSceneItemId', {
      sourceName: `${selectedGame.name} Video Capture`,
      sceneName: `${selectedGame.fullName} Replay`,
    });
    const sceneProperties: OBSResponseTypes['GetSceneItemTransform'] =
      await obs.call('GetSceneItemTransform', {
        sceneItemId: sceneId.sceneItemId,
        sceneName: `${selectedGame.fullName} Replay`,
      });

    const sourceHeight = sceneProperties.sceneItemTransform
      .sourceHeight as number;

    const scaleFactor = 1080 / sourceHeight; // TODO - TEST THIS WITH OTHER GAMES AND RESOLUTIONS AS WELL

    const scaleSourceTo1080 = await obs.call('SetSceneItemTransform', {
      sceneName: `${selectedGame.fullName} Replay`,
      sceneItemId: sceneId.sceneItemId,
      sceneItemTransform: { scaleX: scaleFactor, scaleY: scaleFactor }, // "Object containing scene item transform info to update"
    });

    console.log('Scene resized');
  } catch (err) {
    handleErrors(err);
  }
}
