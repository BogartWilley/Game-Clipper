import { handleErrors } from './handleErrors';
import fs from 'fs';

export function deleteFile(replayPath: string) {
  fs.unlink(replayPath, (err: any) => {
    if (err) {
      handleErrors(err);
      return false;
    }
    console.log('The file was deleted');
    return true;
  });
}
