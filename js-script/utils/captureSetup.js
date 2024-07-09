/* 
LIST ALL POSSIBLE inputKind
const audioSetup = async (obs) => {
	const audio = await obs.call('GetInputKindList', {
		unversioned: false,
	});
	console.log(audio);
}; 
*/

const audioSetup = async (obs, game) => {
	try {
		// Replace 'kofxiii.exe' and 'The King Of Fighters XIII' with your actual values
		const audio = await obs.call('CreateInput', {
			sceneName: 'The King Of Fighters XIII Replay',
			inputName: 'KOF XIII Audio Capture',
			inputKind: 'wasapi_process_output_capture',
			inputSettings: {
				window: 'The King Of Fighters XIII',
				device_id: '[explorer.exe]: Immagini', // Specify the correct device_id here
			},
			sceneItemEnabled: true,
		});
		console.log(audio);
	} catch (err) {
		console.log(err);
	}
};
const videoSetup = async (obs, game) => {
	try {
		const video = await obs.call('CreateInput', {
			sceneName: 'The King Of Fighters XIII Replay',
			inputName: 'KOF XIII Video Capture',
			inputKind: 'game_capture',
			inputSettings: {
				mode: 'window',
				window: 'kofxiii.exe',
				window_priority: 0, // Optional: Window priority (0 = Normal, 1 = Above normal, -1 = Below normal)
				window_match_priority: true,
			},
			sceneItemEnabled: true,
		});
		console.log(video);
	} catch (error) {
		console.error('Error creating game capture input:', error);
	}
};

module.exports = { audioSetup, videoSetup };
