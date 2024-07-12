const { obs } = require('../../app.js');
const handleErrors = require('../handleErrors.js');
console.log(process.env.SELECTED_GAME);
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

console.log(process.env.SELECTED_GAME);
const createNewScene = async (game) => {
	let sceneTitle;
	if (game === 'KOF XIII') sceneTitle = 'The King Of Fighters XIII Replay';
	if (game === 'USF4') sceneTitle = 'Ultra Street Fighter IV Replay';
	try {
		await obs.call('CreateScene', {
			sceneName: sceneTitle,
		});
		console.log('Scene created successfully, setting it as main :');
		await obs.call('SetCurrentProgramScene', {
			sceneName: sceneTitle,
		});
	} catch (err) {
		handleErrors(err);
	}
};

module.exports = {
	getSceneName,
	createNewScene,
};
