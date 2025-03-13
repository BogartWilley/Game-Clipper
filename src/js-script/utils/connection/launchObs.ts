import path from 'path';
import { spawn } from 'child_process';
import fs from 'fs';
import { Notification } from 'electron';

export const launchObs = () => {
  const driveLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const mainPath = 'C:\\Program Files\\obs-studio\\bin\\64bit';

  const startObs = (obsPath: string) => {
    try {
      const obsProcess = spawn(
        path.join(obsPath, 'obs64.exe'),
        ['--minimize-to-tray', '--disable-shutdown-check'], // Starts OBS minimized
        {
          cwd: obsPath, // Set the current working directory to OBS directory
        },
      );

      console.log(`OBS's process started, this is its ID: ${obsProcess.pid}`);
      return obsProcess;
    } catch (err) {
      console.error(
        `Encountered an error while starting OBS's process at ${obsPath}.`,
      );
      console.error(err);
    }
  };

  if (fs.existsSync(path.join(mainPath, 'obs64.exe'))) {
    return startObs(mainPath);
  }

  // TODO - prompt the user to select an installation folder
  for (const letter of driveLetters) {
    const alternativePath = `${letter}:\\Program Files\\obs-studio\\bin\\64bit`;
    if (fs.existsSync(path.join(alternativePath, 'obs64.exe'))) {
      return startObs(alternativePath);
    }
  }

  new Notification({
    title: 'Failed to find the OBS!',
    body: `No OBS installation found... Is the program installed correctly?`,
  }).show();
  return null;
};
