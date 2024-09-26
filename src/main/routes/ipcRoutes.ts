import { ipcMain, Notification, dialog } from 'electron';
import { app } from '../main';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { spawn } from 'child_process';
const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

export const setupIpcRoutes = () => {
  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
  });

  ipcMain.on('run-python-script', (event) => {
    try {
      const exePath = path.join(
        __dirname,
        '..',
        '..',
        // '..',
        // '..',  removes one path for running the app using pnpm dev

        'compiled-scripts',
        'py-script.exe',
      );
      if (isDebug) {
        console.log('Logging the path now');
        console.log(exePath);
      }

      const py = spawn(exePath, {
        env: { ...process.env }, // pass env variables to the Python script
      });
      py.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        event.reply('python-script-output', data.toString());
      });

      py.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        event.reply('python-script-error', data.toString());
      });

      py.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        console.log('Python script exited');
        event.reply('python-script-close', code);
      });
    } catch (err) {
      console.log(err);
    }
  });

  ipcMain.on('display-notification', async (event, message) => {
    function showNotification() {
      new Notification({
        title: 'Error encountered!',
        body: `${message}`,
      }).show();
    }

    showNotification();
  });

  ipcMain.on('change-game', async (event, game) => {
    try {
      process.env.CURRENT_GAME = game;
      const response = await fetch('http://localhost:4609/change-game');

      if (!response.ok) {
        console.log('Failed to change the game');
      } else {
        console.log(`Game changed to ${game}`);
      }
    } catch (error) {
      console.error('Error occurred while changing the game:', error);
    }
  });

  ipcMain.on('save-config-file', async (event, message) => {
    // TODO - FIND OUT WHY IS THIS ONLY SAVING THE THEME SETTING

    const datasPath = app.getPath('userData');
    const data = JSON.stringify(message, null, 2);
    const filePath = path.join(datasPath, 'config.json');
    fs.writeFileSync(filePath, data);
  });

  ipcMain.on('retrieve-config-file', async (event, message) => {
    const datasPath = app.getPath('userData');
    const filePath = path.join(datasPath, 'config.json');
    const configDataString = fs.readFileSync(filePath).toString();
    const configData = JSON.parse(configDataString);
    event.sender.send('retrieve-config-file-reply', configData);
    console.log(configData);
  });

  ipcMain.on('select-replay-directory', async (event, message) => {
    const defaultPath = path.join(os.homedir(), 'Videos');
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
      defaultPath,
    });
    event.returnValue = result.filePaths;
    if (!result.canceled && result.filePaths.length > 0) {
      event.sender.send('select-replay-directory-reply', result.filePaths[0]);
    } else {
      event.sender.send('select-replay-directory-reply', null); // Send null if canceled
    }
    console.log(result);
    os.homedir;
  });
};
