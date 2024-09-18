const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { obs } = require('../../utils/connection/connect');
const {
  setFileOnWatch,
  getFileSizeInBytes,
} = require('../../utils/actions/checkFileSize');
const handleErrors = require('../../utils/actions/handleErrors');
const { uploadFile } = require('../../utils/actions/uploadFile');
const { deleteFile } = require('../../utils/actions/deleteFile');
const { resizeWindow } = require('../../utils/actions/resizeWindow');

router.post('/get-output-file', async (req, res) => {
  try {
    console.log('Route called');
    const filePath = req.body.path;
    const fileSize = getFileSizeInBytes(filePath);
    const watchResult = await setFileOnWatch(filePath);
    if (watchResult === true) {
      const uploadResult = await uploadFile(filePath);
      if (uploadResult === true) {
        deleteFile(filePath);
        res
          .status(200)
          .send({ message: `File uploaded successfully: ${filePath}` });
      }
    } else {
      // Handle the case where setFileOnWatch or uploadResult fails or returns false
      res.status(400).send({
        message: 'Failed to set file on watch. Upload not started.',
      });
    }
  } catch (err) {
    handleErrors(err);
    res.status(400).send({
      message:
        'Encountered an error while saving the replay,is the path correct?',
    });
  }
});

// TODO - PRUNE THIS
router.post('/upload-replay', async (req, res) => {
  const videoPath = 'C:\\Users\\salim\\Videos\\test.mp4'; // TODO - use an env var instead

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

router.get('/ping', async (req, res) => {
  res.status(200).send({ message: 'Pong' });
});

module.exports = router;
