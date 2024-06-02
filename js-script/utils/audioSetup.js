const audioSetup = async (obs) => {
	const audio = obs.call('CreateInput', {
		sceneName: 'The King Of Fighters XIII Replay',
		inputName: 'Blud',
		inputKind: 'Audio',
	});
	console.log(audio);
};

module.exports = audioSetup;
