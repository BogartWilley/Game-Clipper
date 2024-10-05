const fs = require('fs');
const path = require('path');
const handleErrors = require('./handleErrors');

function getFileSizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

let previousTime = Date.now();
let previousFileSize = 0;
let watching = false;

function setFileOnWatch(filepath) {
  try {
    console.log(filepath);
    return new Promise((resolve, reject) => {
      if (watching) {
        return reject(new Error('Already watching a file'));
      }
      watching = true;
      let interval = setInterval(() => {
        const fileSize = getFileSizeInBytes(filepath);
        if (previousFileSize !== fileSize) {
          previousFileSize = fileSize;
          previousTime = Date.now();
          console.log(`File size changed, it's now: ${fileSize}`);
        }
        // If the file size hasn't changed for more than 7 seconds, OBS is done saving
        if (Date.now() - previousTime > 7000) {
          previousFileSize = 0;
          console.log('Exiting the interval');
          watching = false;
          clearInterval(interval);
          resolve(true);
        }
      }, 4000);
    });
  } catch (err) {
    handleErrors(err);
  }
}
module.exports = { getFileSizeInBytes, setFileOnWatch };
