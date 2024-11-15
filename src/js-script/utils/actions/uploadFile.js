const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios'); // Import axios

const pathToVideo = 'C:\\Users\\salim\\Videos\\trim.mkv';

async function uploadFile(filePath) {
  try {
    const currentPlatform = process.env.CURRENT_PLATFORM || 'youtube';
    const currentGame = process.env.CURRENT_GAME || 'KOF XIII';
    const currentUser = process.env.CURRENT_USERNAME || 'Guest';
    const visibility = process.env.VISIBILITY || 'public';
    const fileName = `${currentGame.replace(/_/g, '')} Match Replay | ${currentUser}`;

    const currentEnv = process.env.CURRENT_ENV || 'dev';
    const endpointURL = 'https://salimkof.pro:6001';
    // const endpointURL = 'http://localhost:6001';
    // const endpointURL = currentEnv === 'dev'
    //   ? 'http://localhost:3001'
    //   : 'https://salimkof.pro:3001';

    console.log(`About to upload a file from this path : ${filePath}`);
    const dataStream = fs.createReadStream(filePath);

    // Prepare form data
    const formData = new FormData();
    formData.append('currentGame', currentGame);
    formData.append('currentUser', currentUser);
    formData.append('visibility', visibility);
    console.log(`This is the current platform ${currentPlatform}`);
    formData.append('platform', currentPlatform);
    formData.append('replay', dataStream, fileName);

    // Get headers for form data (necessary for axios)
    const formHeaders = formData.getHeaders();

    // Send the request with axios
    const response = await axios.post(
      `${endpointURL}/api/recieve-video`,
      formData,
      {
        headers: {
          ...formHeaders,
        },
        timeout: 1000 * 60 * 7, // Times out the request after 7 minutes
      },
    );

    if (response.status === 200) {
      console.log('File uploaded successfully');
      return true;
    } else {
      new Notification({
        title: 'Failed to upload the replay.',
        body: `Please ensure your connection is stable.`,
      }).show();
      console.error('Upload failed with status:', response.status);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { uploadFile };
