/* | ~ ~ ~ ~ ~ ~ ~ ~ CONFIG'S ~ ~ ~ ~ ~ ~ ~ | */
const {
  URL: { BACKEND_URL },
} = require("../../config/config");

/**
 * Upload file to AWS-S3
 * @param {string} filePath - Store filePath
 */
exports.UploadFile = (file, uploadPath) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${BACKEND_URL}/${file.filename}`;

      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
};
