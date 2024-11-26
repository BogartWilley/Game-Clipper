/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { startObs } from '../js-script/app';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { spawn } from 'child_process';
import { Notification } from 'electron';
import { setupIpcRoutes } from './routes/ipcRoutes';
import { MessageObject } from '../renderer/utils/displayAlert';
import { setRecoridngRunning } from '../js-script/utils/actions/handleTimer';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// Changes Notification Title
if (process.platform === 'win32') {
  app.setAppUserModelId('Recca');
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

let obsConnectionResult: MessageObject;
let alertSent: boolean = false;

const attemptConnection = async () => {
  try {
    const startObsResult = await startObs();
    obsConnectionResult = startObsResult;
    // Send the result to the main window and check the connection status
    // Attempt to reconnect after 2 seconds
    if (startObsResult?.connected !== true) {
      console.log('\x1b[33m%s\x1b[0m', 'Reconnecting...');
      console.log({
        WS_PORT: process.env.WS_PORT,
        WS_PASSWORD: process.env.WS_PASSWORD,
        USERNAME: process.env.CURRENT_USERNAME,
      });
      setTimeout(attemptConnection, 2000);
      return;
    } else {
      console.log('Connection established!');
      new Notification({
        title: 'OBS process started!',
        body: 'Select a game and confirm to start!',
      }).show();
      if (!alertSent && startObsResult.status !== undefined) {
        mainWindow?.webContents.send('display-alert', startObsResult);
        alertSent = true;
        return;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// Start the connection attempts after an initial delay
setTimeout(attemptConnection, 2000);

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    resizable: false,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    try {
      setupIpcRoutes();
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize();
      } else {
        mainWindow.show();
        const interval = setInterval(() => {
          try {
            if (obsConnectionResult.status !== undefined) {
              console.log(
                'obsConnectionResult.status was not undefined and the alertSent was not false',
              );
              mainWindow?.webContents.send(
                'display-alert',
                obsConnectionResult,
              );
              clearInterval(interval);
            }
          } catch (err) {
            console.log(err);
          }
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  });

  mainWindow.on('close', function (e) {
    const timer: boolean = setRecoridngRunning();
    const message: string = timer
      ? 'A recording is currently running,by closing the application it might not be processed properly.'
      : 'Are you sure you want to quit?';
    const response = dialog.showMessageBoxSync(mainWindow!, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: message,
    });

    if (response == 1) e.preventDefault();
    if (response == 0) console.log(timer);
  });

  mainWindow.on('closed', () => {
    // TODO - GRACEFULLY SHUT DOWN OBS
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  if (!isDebug) mainWindow.setMenu(null);

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

export { app };
