// Web Server imports
const { obs } = require('../obs-api/websocketApi.js');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = 4609;
// Setup imports
const {
	getSceneName,
	createNewScene,
} = require('../utils/scene-setup/scene.js');
const {
	audioSetup,
	videoSetup,
	isSourcePresent,
} = require('../utils/scene-setup/capture.js');
// Action imports
const {
	startRecording,
	pauseRecording,
	resumeRecording,
	stopRecording,
} = require('../utils/actions/recording.js');
const waitKeyPress = require('./waitKeyPress.js');

const authenticate = (req, res, next) => {
	/* 	const token = req.headers['authorization'];
	if (token === `Bearer ${AUTH_TOKEN}`) {
		next();
	} else {
		res.status(403).json({ error: 'Invalid Request' });
	} */
};

app.get('/start-recording', authenticate, async (req, res) => {
	try {
		await startRecording();
		console.log('Recording started');
		res.status(200).send({ message: 'Recording started' });
	} catch (err) {
		console.log('Failed to start the recording');
		console.log(error);
	}
});

app.get('/stop-recording', authenticate, async (req, res) => {
	try {
		await stopRecording();
		console.log('Recording stopped');
		res.status(200).send({ message: 'Recording stopped' });
	} catch (err) {
		console.log('Failed to stop the recording');
		console.log(error);
	}
});
app.get('/test', (req, res) =>
	res.status(200).send({ message: 'Get Request Recieved' })
);
async function exit() {
	console.log("Press 'Q' to exit...");
	await waitKeyPress('q');
	process.exit();
}
exit();

module.exports = { obs, app };
