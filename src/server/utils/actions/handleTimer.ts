import { BrowserWindow } from 'electron';
import { obs } from '../connection/connect';
import { recordingAction, RecordingState, stopRecording } from './recording';
import { handleErrors } from './handleErrors';

let isRecordingRunning: string | undefined = '';

// Helper function to change recording running's state from outside
export function setRecoridngRunning(state?: RecordingState) {
  if (state!.length !== 0 || state === undefined) isRecordingRunning = state;
  console.log(`currently is recording is ${isRecordingRunning}`);
  return isRecordingRunning;
}
export function getRecordingRunning() {
  return isRecordingRunning;
}

export async function handleTimer(state: string) {
  const mainWindow = BrowserWindow.getAllWindows()[0];
  mainWindow.webContents.send(`${state}-timer`); // Sets the timer component's state in React
  try {
    if (state === 'start') {
      setRecoridngRunning('start');
      const interval = setInterval(async () => {
        const status = await obs.call('GetRecordStatus');
        console.log('This is the current status');
        console.log(status);
        if (status.outputActive === false) {
          clearInterval(interval);
        }
        // If the recording is longer than 6:59 mintues, we stop it and discard it
        if (status.outputDuration > 7 * 60 * 1000 - 1000) {
          process.env.REPLAY_DISCONNECTED = 'true';
          await obs.call('StopRecord');
          mainWindow.webContents.send(`stop-timer`);

          // TODO - FIGURE OUT A WAY TO DISPLAY THE PROPER CLOSING MESSAGE UNTIL THE REPLAY HAS FINISHED PROCESSING
        }
      }, 60 * 1000);
    }
  } catch (error) {
    handleErrors(error);
  }
}
