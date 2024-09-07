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
// const isGameRunning = true;  TODO - Close OBS and the script on process kill

// Starts OBS process

launchObs();

// Launching the startScript app

const startObs = async () => {
  const isConnected = await connectWs();
  if (!isConnected) {
    setTimeout(async () => {
      try {
        console.log('Reconnecting...');
        await startObs(); // Await the recursive call to prevent overlapping
      } catch (err) {
        console.log(err);
      }
    }, 3000);
  }
};

obs.on('ConnectionOpened', async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port 4609`);
    });
  } catch (err) {
    handleErrors(err);
  }
});

/* // Only use this when you run the script using node

const waitKeyPress = require('./utils/actions/waitKeyPress.js');
async function exit() {
  console.log("Press 'Q' to exit...");
  await waitKeyPress('q');
  process.exit();
}
exit();

startObs(); */

module.exports = { obs, startObs };
