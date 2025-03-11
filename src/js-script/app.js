const express = require('express');
const app = express();
const { obs } = require('./obs-api/websocketApi.js');
const { connectWs } = require('./utils/connection/connect.js');
const launchObs = require('./utils/connection/launchObs.js');
require('dotenv').config({ path: '../../.env' }); // Reads .env from root
const PORT = process.env.PORT || 4609;
const handleErrors = require('./utils/actions/handleErrors.js');

app.use(express.json());

const recordingRoutes = require('./server/routes/routes.js');
const uploadRoutes = require('./server/routes/uploadRoutes.js');
app.use('/', recordingRoutes);
app.use('/', uploadRoutes);
app.all('*', (req, res) => {
  res.status(400).send({ message: 'Bad Request' });
});

// Starts OBS process

launchObs();

// Launching the startScript app

const startObs = async () => {
  const isConnected = await connectWs();

  return {
    connected: isConnected.connected,
    status: isConnected.status,
    message: isConnected.message,
  };
};

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

/* // Only use this when running the script using "node app.js"

const waitKeyPress = require('./utils/actions/waitKeyPress.js');
async function exit() {
  console.log("Press 'Q' to exit...");
  await waitKeyPress('q');
  process.exit();
}
exit();

startObs(); */

module.exports = { obs, startObs };
