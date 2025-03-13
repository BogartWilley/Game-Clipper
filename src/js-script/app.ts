import { Request, Response } from 'express';

import express from 'express';
const app = express();
import { obs } from './obs-api/websocketApi';
import { connectWs } from './utils/connection/connect';
import { launchObs } from './utils/connection/launchObs';
require('dotenv').config({ path: '../../.env' }); // Reads .env from root
const PORT = process.env.PORT || 4609;
import { handleErrors } from './utils/actions/handleErrors';

app.use(express.json());

import recordingRoutes from './server/routes/routes';
import uploadRoutes from './server/routes/uploadRoutes';
import { MessageObject } from '../renderer/utils/displayAlert';

app.use('/', recordingRoutes);
app.use('/', uploadRoutes);
app.all('*', (req: Request, res: Response) => {
  res.status(400).send({ message: 'Bad Request' });
});

// Starts OBS process
launchObs();

// Launching the startScript app

export async function startObs(): Promise<MessageObject> {
  const isConnected = await connectWs();

  return {
    connected: isConnected.connected,
    status: isConnected.status,
    message: isConnected.message,
  };
}

let isServerRunning = false;

obs.on('ConnectionOpened', async () => {
  try {
    if (!isServerRunning) {
      app.listen(PORT, () => {
        console.log(`Server listening on port 4609`);
      });
      isServerRunning = true;
    } else {
      console.log('Server is already running...');
    }
  } catch (err) {
    handleErrors(err);
  }
});

/* // Only use this when running the script using "node app"

const waitKeyPress = require('./utils/actions/waitKeyPress');
async function exit() {
  console.log("Press 'Q' to exit...");
  await waitKeyPress('q');
  process.exit();
}
exit();

startObs(); */
