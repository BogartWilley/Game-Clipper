const express = require('express');
const router = express.Router();
const fs = require('fs');
const { setFileOnWatch } = require('../../utils/actions/checkFileSize');
const handleErrors = require('../../utils/actions/handleErrors');

router.post('/get-output-file', async (req, res) => {
  try {
    const filePath = req.body.filePath;
    setFileOnWatch(filePath);
    res
      .status(400)
      .send({ message: `Checking the file for changes: ${filePath}` });
  } catch (err) {
    handleErrors(err);
    res.status(400).send({
      message:
        'Encountered an error while saving the replay,is the path correct?',
    });
  }
});

router.get('/replay-saved', (req, res) => {
  res.status(200).send({ message: 'Replay file saved successfully' });

  // UPLOAD TO VPS OR YT
});

router.get('/ping', (req, res) => {
  console.log('Pong');
  res.status(200).send({ message: 'Pong' });
});
module.exports = router;
