const { obs } = require('./obs-api/websocketApi.js');
const { connectWs } = require('./utils/connection/connect.js');
const launchObs = require('./utils/connection/launchObs.js');
const express = require('express');
const app = express();
const PORT = 4609;
const recordingRoutes = require('./server/routes/routes.js');

const handleErrors = require('./utils/handleErrors.js');

app.use(express.json());
app.use('/', recordingRoutes);

require('dotenv').config({ path: '../../.env' }); // Reads .env from root
const isGameRunning = true; // TODO - Close OBS and the script on game close

// Starts OBS process

const obsProcess = launchObs();

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
    return;
  }
};

obs.on('ConnectionOpened', async () => {
  try {
    app.listen(4609, () => {
      console.log(`Server listening on port 4609`);
      // TODO: Move it to websocketApi.js
    });
  } catch (err) {
    handleErrors(err);
  }
});

/* 
Only use this when you run the script using node 

const waitKeyPress = require('./utils/actions/waitKeyPress.js');
async function exit() {
	console.log("Press 'Q' to exit...");
	await waitKeyPress('q');
	process.exit();
}
exit(); 

*/

// startObs();

module.exports = { obs, startObs };
