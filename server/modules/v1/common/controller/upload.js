/* | ~ ~ ~ ~ ~ ~ ~ ~ CONSTANTS ~ ~ ~ ~ ~ ~ ~ ~ | */
const { CREATED_CODE } = require("../../../../constant/statusCode");
const MSG = require("../../../../constant/messages");

/* | ~ ~ ~ ~ ~ ~ ~ ~ LIB FUNCTIONS ~ ~ ~ ~ ~ ~ ~ ~ | */
const {
  sendResponse,
  exceptionError,
} = require("../../../../lib/response-fun");

/* | ~ ~ ~ ~ ~ ~ ~ ~ SERVICE FUNCTIONS ~ ~ ~ ~ ~ ~ ~ ~ | */
const { UploadFile } = require("../../../../services/aws/upload");

/* --------------------------------------------------
 |                                                  |
 | ~ ~ ~ ~ ~ ~ ~ ~ ROUTES FUNCTIONS ~ ~ ~ ~ ~ ~ ~ ~ |
 |                                                  |
 --------------------------------------------------- */

exports.uploadFile = async (req, res) => {
  try {
    const url = await UploadFile(req.file, req.body.path);

    return sendResponse(req, res, CREATED_CODE, MSG.UPLOADED_SUCESSFULLY, url);
  } catch (error) {
    return exceptionError(req, res, error);
  }
};
