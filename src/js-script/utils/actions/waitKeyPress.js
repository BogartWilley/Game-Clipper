/* const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

function waitKeyPress(key) {
	return new Promise((resolve) => {
		process.stdin.on('keypress', (str, keypress) => {
			if (keypress.name === key) {
				resolve(key);
			}
		});
	});
}

module.exports = waitKeyPress;
 */
