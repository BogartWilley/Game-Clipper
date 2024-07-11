const { obs } = require('../app.js');
const { createNewScene } = require('../utils/scene-setup/scene.js');
const { app } = require('../server/server.js');
const {
	isSourcePresent,
	audioSetup,
	videoSetup,
} = require('../utils/scene-setup/capture.js');

obs.on('ExitStarted', () => {
	console.log('Now exiting...');
	process.exit();
});

obs.on('Identified', async () => {
	console.log('Connected to OBS WebSocket');
	await createNewScene('KOF XIII');

	const sources = await isSourcePresent();

	if (!sources) {
		console.log('Creating Input Sources...');
		await audioSetup('KOF XIII');
		await videoSetup('KOF XIII');
	}
});

obs.on('ConnectionOpened', () => {
	app.listen(4609, () => {
		console.log(`Server listening on port 4609`);
		// TODO: Import the app object from server.js somehow,so that
		// you can start the server once obs's connection has been established
	});
});

module.exports = { obs };
