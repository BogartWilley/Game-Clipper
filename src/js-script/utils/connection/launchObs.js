const path = require('path');
const { spawn } = require('child_process');

const launchObs = () => {
	const obsDir = 'C:\\Program Files\\obs-studio\\bin\\64bit';
	const obsProcess = spawn(
		path.join(obsDir, 'obs64.exe'),
		['--minimize-to-tray'],
		{
			cwd: obsDir, // Set the current working directory to OBS directory
		}
	);
	console.log(`OBS's process started,this is it's ID: ${obsProcess.pid}`);
	return obsProcess;
};

function exitHandler() {
	console.log('Now Exiting...');
	setTimeout(() => {
		process.exit();
	}, 3000);
}
process.on('SIGINT', exitHandler);
process.on('SIGTERM', exitHandler);
process.on('SIGQUIT', exitHandler);
module.exports = launchObs;
