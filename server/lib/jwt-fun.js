const jwt = require("jsonwebtoken");

/* | ~ ~ ~ ~ ~ ~ ~ ~ ~ CONFIG'S ~ ~ ~ ~ ~ ~ ~ ~ | */
const {
  JWT_OPTIONS: { SECRET_KEY, EXPIRES_IN, ALGORITHM, ERROR_MSG },
} = require("../config/config");

/* | ~ ~ ~ ~ ~ ~ ~ ~ LIB FUNCTIONS ~ ~ ~ ~ ~ ~ ~ ~ | */
const { encrypt, decrypt } = require("../lib/universal-fun");
const { sendResponse } = require("../lib/response-fun");

/* | ~ ~ ~ ~ ~ ~ ~ ~ CONSTANTS ~ ~ ~ ~ ~ ~ ~ ~ | */
const { UNAUTHORIZED_CODE } = require("../constant/statusCode");
const MSG = require("../constant/messages");

/**
 * Encrypts data using JWT sign
 * @param {token} token - text to encrypt
 */
const jwtSign = async (data) => {
  const payload = { _id: data._id, email: data.email };

  return encrypt(
    jwt.sign(payload, SECRET_KEY, {
      expiresIn: EXPIRES_IN,
      algorithm: ALGORITHM,
    })
  );
};

/**
 * Decrypt data using JWT verify
 * @param {token} token - text to encrypt
 */
const jwtVerify = async (req, res, token) => {
  try {
    return jwt.verify(decrypt(token), SECRET_KEY);
  } catch (error) {
    if (error?.message === ERROR_MSG) {
      return sendResponse(req, res, UNAUTHORIZED_CODE, MSG.UNAUTHORIZED);
    } else throw error;
  }
};

/**
 * Decrypt data using JWT verify
 * @param {token} token - text to encrypt
 */
const jwtDecode = async (token) => {
  return jwt.decode(token, {
    complete: true,
  });
};

module.exports = { jwtSign, jwtVerify, jwtDecode };
