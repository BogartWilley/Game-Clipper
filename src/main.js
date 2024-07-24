const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');
const { main } = require('./js-script/app');
function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
		resizable: false,
	});

	win.loadFile('index.html');
}

app.whenReady().then(() => {
	createWindow();
	console.log('Calling main in 3s');
	setTimeout(() => {
		main();
	});
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
