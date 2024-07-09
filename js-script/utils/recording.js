const startRecording = async (obs) => {
	try {
		console.log('Start the recording');
		const start = await obs.call('StartRecord');
	} catch (err) {
		console.log('Failed to start recording');
		console.log(err);
	}
};
const pauseRecording = async (obs) => {
	try {
		console.log('Pause the recording');
		const pause = obs.call('PauseRecord');
	} catch (err) {
		console.log('Failed to pause recording');
		console.log(err);
	}
};
const resumeRecording = async (obs) => {
	try {
		console.log('Resume the recording');
		const resume = await obs.call('ResumeRecord');
	} catch (err) {
		console.log('Failed to resume recording');
		console.log(err);
	}
};
const stopRecording = async (obs) => {
	try {
		console.log('Stop the recording');
		const stop = obs.call('StopRecord');
	} catch (err) {
		console.log('Failed to stop recording');
		console.log(err);
	}
};
module.exports = {
	startRecording,
	pauseRecording,
	resumeRecording,
	stopRecording,
};
