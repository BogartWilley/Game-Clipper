const fs = require('fs');

const pathToVideo = 'C:\\Users\\salim\\Videos\\test.mp4';

async function uploadFile(filePath) {
  try {
    const endpointURL = process.env.CURRENT_ENV || 'http://localhost:3001';
    console.log(`About to upload a file from this path : ${filePath}`);
    const file = await fs.openAsBlob(filePath);
    const formData = new FormData();
    formData.set('testVideoName', file, 'test.mp4');
    const response = await fetch(`https://salimkof.pro:3001/recieve-video`, {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      console.log('File uploaded successfully');
      return true;
    } else {
      console.error('Upload failed with status:', response.status);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { uploadFile };
// ONLY WORKS WHEN HARDCODING THE SAME EXACT PATH
