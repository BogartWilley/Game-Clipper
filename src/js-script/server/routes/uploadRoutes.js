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
const { setRecoridngRunning } = require('../../utils/actions/handleTimer');

router.post('/parse-video', async (req, res) => {
  try {
    const filePath = req.body.path;
    const disconnected = req.body.disconnected === 'true';
    const fileSize = getFileSizeInBytes(filePath);
    const watchResult = await setFileOnWatch(filePath);
    setRecoridngRunning(false);
    // Discard replays flagged as "disconnected"
    if (disconnected === true) {
      deleteFile(filePath);
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
        message: 'Failed to upload the replay.',
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

// TEST ROUTES
// router.get('/uploadtovps', async (req, res) => {
//   const response = await uploadFile('C:\\Users\\salim\\Videos\\test.mp4');

//   if (!response) {
//     res.sendStatus(501);
//   } else {
//     res.sendStatus(200);
//   }
// });

// router.get('/ping', async (req, res) => {
//   res.status(200).send({ message: 'Pong' });
// });

module.exports = router;
