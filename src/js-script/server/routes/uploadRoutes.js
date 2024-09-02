const express = require('express');
const router = express.Router();
const fs = require('fs');
const {
  checkIfSaved,
  getFilesizeInBytes,
} = require('../../utils/actions/checkFileSize');

router.post('/get-output-file', async (req, res) => {
  const filePath = req.body.filePath;
  try {
    const isSaved = await checkIfSaved(filePath);
    if (isSaved) {
      const finalSize = getFilesizeInBytes(filePath);
      res.status(200).send({
        message: `Replay saved successfully, it's size is ${finalSize} bytes.`,
      });
    }
  } catch (error) {
    res.status(500).send({ message: 'There was an error saving the replay.' });
  }
});

router.get('/ping', (req, res) => {
  console.log('Pong');
  res.status(200).send({ message: 'Pong' });
});
module.exports = router;
