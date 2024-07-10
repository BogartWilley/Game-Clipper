const { default: OBSWebSocket } = require('obs-websocket-js');
const obs = new OBSWebSocket();
const { getSceneName, createNewScene } = require('./utils/scene.js');
const connectWs = require('./utils/connect.js');
const launchObs = require('./utils/launchObs.js');
const {
	audioSetup,
	videoSetup,
	logSettings,
} = require('./utils/captureSetup.js');
const {
	startRecording,
	pauseRecording,
	resumeRecording,
	stopRecording,
} = require('./utils/recording.js');
const waitKeyPress = require('./utils/waitKeyPress.js');

const isGameRunning = true; // TODO - Close OBS and the script on game close

// Starts OBS process

const process = launchObs();

setTimeout(() => {
	console.log("Console.logging the process's id");
	console.log(process.pid);
}, 5000);

// Launching the main app

const main = async () => {
	const isConnected = await connectWs(obs);
	if (!isConnected) {
		setTimeout(async () => {
			try {
				console.log('Reconnecting...');
				await main(); // Await the recursive call to prevent overlapping
			} catch (err) {
				console.log(err);
			}
		}, 5000);
		return;
	}
	await createNewScene(obs);
	await audioSetup(obs);
	await videoSetup(obs);
	console.log('LOGGING AUDIO SETTINGS');
	logSettings(obs, 'audio');
	console.log('LOGGING VIDEO SETTINGS');
	logSettings(obs, 'video');
	// await startRecord(obs);
	console.log('Should run if connected');
};

main();

// TESTING RECORD FEATURE  :

async function startRecord() {
	setTimeout(() => {
		startRecording(obs);
		setTimeout(() => {
			stopRecording(obs);
		}, 3000);
	}, 5000);
}
/* setTimeout(() => {
	audioSetup(obs);
	startRecording(obs);
	setTimeout(() => {
		stopRecording(obs);
	}, 5000);
}, 6700); */
