const { obs } = require('../connection/connect');

async function muteInputs(selectedGame) {
  const sourceName = `${selectedGame.fullName} IV Replay`;
  const sources = await obs.call('GetInputList', {
    sourceName: sourceName,
  });
  const inputsToMute = sources.inputs.filter((source) => {
    return (
      source.inputKind !== 'game_capture' &&
      source.inputKind !== 'wasapi_process_output_capture'
    );
  });

  inputsToMute.forEach(async (input) => {
    const muteInputs = await obs.call('SetInputMute', {
      inputName: input.inputName,
      inputUuid: input.inputUuid,
      inputMuted: true,
    });
  });
  console.log(inputsToMute);
}

module.exports = { muteInputs };
