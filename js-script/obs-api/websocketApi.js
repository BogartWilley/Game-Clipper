const { obs } = require('../app.js');
const { createNewScene } = require('../utils/scene-setup/scene.js');
const {
	isSourcePresent,
	audioSetup,
	videoSetup,
} = require('../utils/scene-setup/capture.js');
const handleErrors = require('../utils/handleErrors.js');

obs.on('ExitStarted', () => {
	console.log('Now exiting...');
	try {
		process.exit();
	} catch (err) {
		handleErrors(err);
	}
});

obs.on('Identified', () => {
	try {
		// Assures that the program is ready to process requests
		setTimeout(async () => {
			console.log('Connected to OBS WebSocket');
			await createNewScene('KOF XIII');
			const sources = await isSourcePresent();
			if (!sources) {
				console.log('Creating Input Sources...');
				await audioSetup('KOF XIII');
				await videoSetup('KOF XIII');
			}
			const alertServer = fetch('http://localhost:4609/obs-ready', {
				method: 'GET',
			});
		}, 1000);
	} catch (err) {
		handleErrors(err);
	}
});

obs.on('MediaInputActionTriggered', () => {
	const divider = '_';
	const dividerLine = divider * 50;
	console.log(dividerLine);
	console.log('Replay saved');
});

module.exports = { obs };
