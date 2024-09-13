const fs = require('fs');

const path = require('path');
const datecode = '2024-09-03 17-22-40';
const filePath = path.join('C:', 'Users', 'salim', 'Videos', `${datecode}.mkv`);

function getFileSizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

let previousTime = Date.now();
let previousFileSize = 0;
let watching = false;

function setFileOnWatch(filepath) {
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

      if (Date.now() - previousTime > 7000) {
        previousFileSize = 0;
        console.log('More than 7 seconds passed');
        console.log('Exiting the interval');
        watching = false;
        clearInterval(interval);
        resolve(true); // Resolve the promise when the condition is met
      }
    }, 4000);
  });
}
module.exports = { getFileSizeInBytes, setFileOnWatch };
