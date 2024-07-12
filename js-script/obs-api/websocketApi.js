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

obs.on('Identified', async () => {
	try {
		console.log('Connected to OBS WebSocket');
		await createNewScene('KOF XIII');
		const sources = await isSourcePresent();
		if (!sources) {
			console.log('Creating Input Sources...');
			await audioSetup('KOF XIII');
			await videoSetup('KOF XIII');
		}
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
