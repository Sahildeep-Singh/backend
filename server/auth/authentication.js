const ObjectId = require("mongoose").Types.ObjectId;

/* | ~ ~ ~ ~ ~ ~ ~ ~ LIB FUNCTIONS ~ ~ ~ ~ ~ ~ ~ ~ | */
const { jwtVerify } = require("../lib/jwt-fun"),
  { FindById } = require("../lib/mongoose-fun"),
  { exceptionError, sendResponse } = require("../lib/response-fun");

/* | ~ ~ ~ ~ ~ ~ ~ ~ CONSTANTS ~ ~ ~ ~ ~ ~ ~ ~ | */
const { UNAUTHORIZED_CODE } = require("../constant/statusCode"),
  MSG = require("../constant/messages");

/* | ~ ~ ~ ~ ~ ~ ~ ~ MODELS ~ ~ ~ ~ ~ ~ ~ ~ | */
const User = require("../models/user");

/**
 * Token authertication function called by route
 * @param {Array} USER_TYPE - models specified on the route
 */
exports.requireAuth = () => async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization
      ?.replace("Bearer ", "")
      .trim();

    if (!accessToken) {
      return sendResponse(req, res, UNAUTHORIZED_CODE, MSG.UNAUTHORIZED);
    }

    const decodeData = await jwtVerify(req, res, accessToken);

    if (!decodeData) {
      return sendResponse(req, res, UNAUTHORIZED_CODE, MSG.UNAUTHORIZED);
    }

    const userData = await FindById(User, new ObjectId(decodeData._id));

    if (!userData || userData?.accessToken !== accessToken) {
      return sendResponse(req, res, UNAUTHORIZED_CODE, MSG.UNAUTHORIZED);
    }

    req.user = userData;
    next();
  } catch (error) {
    return exceptionError(req, res, error);
  }
};
