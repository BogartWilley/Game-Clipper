import { GameInfo } from './selectGame';

import { obs } from '../connection/connect';
import { OBSRequestTypes, OBSResponseTypes } from 'obs-websocket-js';

export async function muteInputs(selectedGame: GameInfo) {
  const sourceName = `${selectedGame.fullName} IV Replay`;
  const sources: OBSResponseTypes['GetInputList'] = await obs.call(
    'GetInputList',
    {
      inputKind: sourceName,
    },
  );
  const inputsToMute = sources.inputs.filter((source) => {
    return (
      source.inputKind !== 'game_capture' &&
      source.inputKind !== 'wasapi_process_output_capture'
    );
  });

  inputsToMute.forEach(async (input) => {
    const muteInputs: OBSResponseTypes['SetInputMute'] = await obs.call(
      'SetInputMute',
      {
        inputName: input.inputName as string,
        inputUuid: input.inputUuid as string,
        inputMuted: true,
      },
    );
  });
  console.log(inputsToMute);
}
