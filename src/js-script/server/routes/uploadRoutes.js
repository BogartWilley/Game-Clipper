const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const {
  setFileOnWatch,
  getFileSizeInBytes,
} = require('../../utils/actions/checkFileSize');
const handleErrors = require('../../utils/actions/handleErrors');

router.post('/get-output-file', async (req, res) => {
  try {
    console.log('Route called');
    const filePath = req.body.path;
    const fileSize = getFileSizeInBytes(filePath);
    console.log(getFileSizeInBytes(filePath));
    console.log(filePath);
    await setFileOnWatch(filePath);

    //UPLOAD TO VPS
    res
      .status(200)
      .send({ message: `Checking the file for changes: ${filePath}` });
  } catch (err) {
    handleErrors(err);
    res.status(400).send({
      message:
        'Encountered an error while saving the replay,is the path correct?',
    });
  }
});

router.post('/upload-replay', async (req, res) => {
  const isDev = true;
  const VPSURL = isDev ? 'http://localhost:3001' : 'https://salimkof.pro';
  const videoPath = 'C:\\Users\\salim\\Videos\\test.mp4';

  try {
    // Ensure the video file exists
    if (!fs.existsSync(videoPath)) {
      return res.status(400).send({ message: 'File not found' });
    }

    const fileStream = fs.createReadStream(videoPath);
    const fileName = path.basename(videoPath);

    const response = await fetch(`${VPSURL}/recieve-replay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
      body: fileStream,
      duplex: 'half',
    });

    if (response.ok) {
      res
        .status(200)
        .send({ message: 'Replay file uploaded to VPS successfully' });
    } else {
      const errorDetails = await response.text();
      res.status(response.status).send({
        message: 'Failed to upload file to VPS',
        details: errorDetails,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: 'Error uploading file to VPS', error: error.message });
  }
});

router.get('/ping', (req, res) => {
  console.log('Pong');
  res.status(200).send({ message: 'Pong' });
});

module.exports = router;
