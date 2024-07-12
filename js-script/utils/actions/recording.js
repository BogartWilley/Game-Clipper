const { obs } = require('../../app');
const handleErrors = require('../handleErrors');
const startRecording = async () => {
	try {
		const start = await obs.call('StartRecord');
		console.log('Start the recording');
	} catch (err) {
		console.log('Failed to start recording');
		handleErrors(err);
	}
};
const pauseRecording = async () => {
	try {
		const pause = await obs.call('PauseRecord');
		console.log('Pause the recording');
	} catch (err) {
		console.log('Failed to pause recording');
		handleErrors(err);
	}
};
const resumeRecording = async () => {
	try {
		const resume = await obs.call('ResumeRecord');
		console.log('Resume the recording');
	} catch (err) {
		console.log('Failed to resume recording');
		handleErrors(err);
	}
};
const stopRecording = async () => {
	try {
		const stop = await obs.call('StopRecord');
		console.log('Stop the recording');
	} catch (err) {
		console.log('Failed to stop recording');
		handleErrors(err);
	}
};

module.exports = {
	startRecording,
	pauseRecording,
	resumeRecording,
	stopRecording,
};
