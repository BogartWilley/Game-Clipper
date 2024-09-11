const fs = require('fs');

const pathToVideo = 'C:\\Users\\salim\\Videos\\Captures\\test.mp4';

async function uploadFile(filePath) {
  try {
    const file = await fs.openAsBlob(filePath);
    const formData = new FormData();
    formData.set('testVideoName', file, 'test.mp4');
    return fetch('http://localhost:3001/recieve-video', {
      method: 'POST',
      body: formData,
    });
  } catch (err) {
    console.log(err);
  }
}

uploadFile(pathToVideo);
module.exports = { uploadFile };
