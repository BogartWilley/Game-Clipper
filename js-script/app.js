const { default: OBSWebSocket } = require('obs-websocket-js');
const obs = new OBSWebSocket();
const { getSceneName, createNewScene } = require('./utils/scene.js');
const connectWs = require('./utils/connect.js');
const launchObs = require('./utils/launchObs.js');
const {
	startRecording,
	pauseRecording,
	resumeRecording,
	stopRecording,
} = require('./utils/recording.js');
const audioSetup = require('./utils/audioSetup.js');

// Connecting to OBS's websocket
connectWs(obs);

// Starts OBS process

const process = launchObs();

setTimeout(() => {
	console.log("Console.logging the process's id");
	console.log(process.pid);
}, 5000);

// Launching the main app

const main = async () => {
	const isConnected = await connectWs();
	if (!isConnected) {
		// Wait for OBS to start and connect to the WebSocket
		setTimeout(() => {
			const reconnect = async () => {
				try {
					await obs.connect('ws://127.0.0.1:4455', 'super-sekret', {
						rpcVersion: 1,
					});
					console.log('Connected to OBS WebSocket');
					await createNewScene(obs);
				} catch (error) {
					console.error(
						'Failed to connect to OBS WebSocket',
						error.code,
						error.message
					);
					// Reconnect after 5 seconds
					setTimeout(reconnect, 5000);
				}
			};
			reconnect();
		}, 5000);
	} else {
		await createNewScene(obs);
	}
};

main();

// TESTING RECORD FEATURE  :

setTimeout(() => {
	audioSetup(obs);
	startRecording(obs);
	setTimeout(() => {
		stopRecording(obs);
	}, 5000);
}, 10000);
