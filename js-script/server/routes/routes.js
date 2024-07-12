const express = require('express');
const router = express.Router();
const {
	startRecording,
	pauseRecording,
	resumeRecording,
	stopRecording,
} = require('../../utils/actions/recording');
const handleErrors = require('../../utils/handleErrors');
const authenticate = require('../middlewares/authenticate');

router.get('/start-recording', authenticate, async (req, res) => {
	try {
		game = req.header.game;
		await startRecording();
		console.log('Recording started');
		res.status(200).send({ message: 'Recording started' });
	} catch (err) {
		console.log('Failed to start the recording');
		handleErrors(err);
	}
});

router.get('/stop-recording', async (req, res) => {
	try {
		await stopRecording();
		console.log('Recording stopped');
		res.status(200).send({ message: 'Recording stopped' });
	} catch (err) {
		console.log('Failed to stop the recording');
		handleErrors(err);
	}
});
router.get('/pause-recording', async (req, res) => {
	try {
		await pauseRecording();
		console.log('Recording paused');
		res.status(200).send({ message: 'Recording paused' });
	} catch (err) {
		console.log('Failed to pause the recording');
		handleErrors(err);
	}
});
router.get('/test2', (req, res) => {
	console.log(process.env.SELECTED_GAME);
	res.status(200).send({
		message: `env read set successfully:  ${process.env.SELECTED_GAME}`,
	});
});
router.get('/resume-recording', async (req, res) => {
	try {
		await resumeRecording();
		console.log('Recording resumed');
		res.status(200).send({ message: 'Recording resumed' });
	} catch (err) {
		console.log('Failed to resume the recording');
		handleErrors(err);
	}
});

module.exports = router;
