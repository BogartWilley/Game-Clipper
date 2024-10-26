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

router.post('/uploadtovps', async (req, res) => {
  try {
    const uploaded = await uploadFile('C:\\Users\\salim\\Videos\\trim.mkv');
    if (!uploaded) {
      res.sendStatus(501);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    handleErrors(err);
    res.status(400).send({
      message:
        'Encountered an error while saving the replay,is the path correct?',
    });
  }
});
router.post('/get-output-file', async (req, res) => {
  try {
    console.log('Route called');
    const filePath = req.body.path;
    const disconnected = req.body.disconnected === 'true';
    console.log('This is disconnected from uploadRoutes');
    console.log(disconnected);
    const fileSize = getFileSizeInBytes(filePath);
    const watchResult = await setFileOnWatch(filePath);
    // Discard replays flagged as "disconnected"

    if (disconnected === true) {
      deleteFile(filePath);
      console.log(
        `This is the watch result : ${watchResult} The file status is disconnected...Won't upload it`,
      );
      res.status(201).send({
        message: 'The uncomplete replay has been deleted successfully',
      });
      return;
    }

    // Upload and delete completed replays
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

router.get('/uploadtovps', async (req, res) => {
  const response = await uploadFile('C:\\Users\\salim\\Videos\\test.mp4');

  if (!response) {
    res.sendStatus(501);
  } else {
    res.sendStatus(200);
  }
});

router.get('/ping', async (req, res) => {
  res.status(200).send({ message: 'Pong' });
});

module.exports = router;
