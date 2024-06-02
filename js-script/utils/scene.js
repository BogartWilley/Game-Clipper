const getSceneName = async (obs) => {
	try {
		const currentScene = await obs.call('GetCurrentProgramScene');
		console.log('This is the current selected scene : ');
		console.log(currentScene);
	} catch (err) {
		console.log("Couldn't find the selected scene");
		throw err;
	}
};

const createNewScene = async (obs) => {
	try {
		await obs.call('CreateScene', {
			sceneName: 'The King Of Fighters XIII Replay',
		});
		console.log('Scene created successfully, setting it as main :');
		await obs.call('SetCurrentProgramScene', {
			sceneName: 'The King Of Fighters XIII Replay',
		});
		console.log('Now calling getSceneName()');
		await getSceneName(obs);
	} catch (error) {
		console.error('Failed to create scene', error.code, error.message);
	}
};
module.exports = {
	getSceneName,
	createNewScene,
};
