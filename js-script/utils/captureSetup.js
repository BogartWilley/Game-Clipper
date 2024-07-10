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
				window:
					'The King of Fighters XIII:F9D96469-6208-4609-AA55-1192042585C3:kofxiii.exe',
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
				capture_mode: 'window',
				window:
					'The King of Fighters XIII:F9D96469-6208-4609-AA55-1192042585C3:kofxiii.exe', // TODO - fetch and embeed OBS's window uuid
				window_match_priority: true,
				window_priority: 0,
			},
			sceneItemEnabled: true,
		});

		console.log(video);
	} catch (error) {
		console.error('Error creating game capture input:', error);
	}
};

//  ---------- TESTING FUNCTIONS ----------
const logSettings = async (obs, type) => {
	if (type === 'video') {
		const video = await obs.call('GetInputSettings', {
			inputName: 'KOF XIII Video Capture',
		});
		console.log(video);
		return;
	}
	if (type === 'audio') {
		const audio = await obs.call('GetInputSettings', {
			inputName: 'KOF XIII Audio Capture',
		});
		console.log(audio);
	}
};

module.exports = { audioSetup, videoSetup, logSettings };
