const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const launchObs = () => {
  const drives = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const mainPath = 'C:\\Program Files\\obs-studio\\bin\\64bit';

  const startObs = (obsPath) => {
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

  for (const letter of drives) {
    const alternativePath = `${letter}:\\Program Files\\obs-studio\\bin\\64bit`;
    if (fs.existsSync(path.join(alternativePath, 'obs64.exe'))) {
      console.log(`Found obs in ${alternativePath}`);
      return startObs(alternativePath);
    }
  }

  console.log('No OBS installation found.');
  return null;
};

module.exports = launchObs;
