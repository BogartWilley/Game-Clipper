const fs = require('fs');

function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}
function checkIfSaved(filePath) {
  let fileSize = getFilesizeInBytes(filePath);
  let timer = 0;
  const interval = setInterval(() => {
    const currentFileSize = getFilesizeInBytes(filePath);
    if (currentFileSize === fileSize) {
      timer += 1000;
      if (timer >= 15000) {
        console.log('Replay saved successfully');
        clearInterval(interval);
        return true;
      }
    } else {
      fileSize = currentFileSize;
      console.log(`This time passed between the checks : ${timer}`);
      timer = 0;
    }
    return false;
  }, 1000);
}

module.exports = { checkIfSaved, getFilesizeInBytes };
