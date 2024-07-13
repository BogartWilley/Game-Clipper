const { default: OBSWebSocket } = require('obs-websocket-js');
const obs = new OBSWebSocket();
const connectWs = require('./utils/connection/connect.js');
const launchObs = require('./utils/connection/launchObs.js');
require('dotenv').config();

const isGameRunning = true; // TODO - Close OBS and the script on game close

// Starts OBS process

const process = launchObs();

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
		}, 3000);
		return;
	}
};

main();

module.exports = { obs };
