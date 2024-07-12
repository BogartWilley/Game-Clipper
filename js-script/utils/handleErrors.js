const { createNewScene } = require('./scene-setup/scene');

function handleErrors(err) {
	// Adds colored error messages
	console.log(`\x1b[31m--- ERROR: \x1b[33m${err.code}\x1b[31m ---\x1b[0m`);
	function printError(message) {
		console.log(`\x1b[1;31m${message}\x1b[0m`);
	}
	switch (err.code) {
		case 207: {
			printError('The server is not ready to handle the request.');
			console.log('Retrying...');
			setTimeout(() => {
				console.log('FIRING createNewScene()');
				createNewScene();
			}, 500);
			break;
		}
		case 500:
			printError(
				'An output is running and cannot be in order to perform the request.'
			);
		case 501:
			printError('An output is not running and should be.');
			break;
		case 502:
			printError('An output is paused and should not be.');
			break;
		case 503:
			printError('An output is not paused and should be.');
			break;
		case 504:
			printError('An output is disabled and should not be.');
			break;
		case 505:
			printeError('Studio mode is active and cannot be.');
			break;
		case 506:
			printError('Studio mode is not active and should be.');
			break;
		case 601:
			printError('A source already exists by that scene name.');
			break;
		default:
			console.log(err);
	}
}
module.exports = handleErrors;

// Refer to https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.json
