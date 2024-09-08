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

function setFileOnWatch(filepath) {
  const interval = setInterval(() => {
    const fileSize = getFileSizeInBytes(filepath);
    if (previousFileSize != fileSize) {
      previousFileSize = fileSize;
      previousTime = Date.now();
      console.log(`File size changed,it's now : ${fileSize}`);
    }

    if (Date.now() - previousTime > 7000) {
      previousFileSize = 0;
      console.log('More than 7 seconds passed');
      console.log('I should now just exit the interval');
      clearInterval(interval);
      return true;
    }
  }, 4000);
}
module.exports = { getFileSizeInBytes, setFileOnWatch };
