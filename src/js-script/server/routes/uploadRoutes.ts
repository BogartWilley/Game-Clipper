import { Request, Response } from 'express';
import { Router } from 'express';
import {
  setFileOnWatch,
  getFileSizeInBytes,
} from '../../utils/actions/checkFileSize';
import { handleErrors } from '../../utils/actions/handleErrors';
import { uploadFile } from '../../utils/actions/uploadFile';
import { deleteFile } from '../../utils/actions/deleteFile';
import { resizeWindow } from '../../utils/actions/resizeWindow';
import { setRecoridngRunning } from '../../utils/actions/handleTimer';

const router = Router();
router.post('/parse-video', async (req: Request, res: Response) => {
  try {
    const filePath = req.body.path;
    const disconnected = req.body.disconnected === 'true';
    const fileSize = getFileSizeInBytes(filePath);
    const watchResult = await setFileOnWatch(filePath);
    setRecoridngRunning('stop'); // TODO - FIGURE THIS OUT
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
export default router;
