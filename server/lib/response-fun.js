/* | ~ ~ ~ ~ ~ ~ ~ ~ ~ CONSTANTS ~ ~ ~ ~ ~ ~ ~ ~ ~ | */
const {
  SUCCESS_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  VALIDATION_CODE,
} = require("../constant/statusCode");
const {
  SUCCESSFULLY,
  LANGUAGE_TYPE,
  INTERNAL_SERVER_ERROR,
} = require("../constant/messages");

/* | ~ ~ ~ ~ ~ ~ ~ ~ ~ MESSAGES ~ ~ ~ ~ ~ ~ ~ ~ ~ | */
const MESSAGE = require("../langs");

/**
 * Send Response
 * @param {object object number string object}
 */
const sendResponse = async (req, res, code, message, data) => {
  try {
    const lang = req.headers["content-language"] || LANGUAGE_TYPE.ENGLISH;
    code = code || SUCCESS_CODE;
    message = message || SUCCESSFULLY;
    data = data || {};

    return res.status(code).json({
      status: true,
      statusCode: code,
      message: MESSAGE[lang][message],
      data,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Send Response
 * @param {object object object}
 */
const exceptionError = async (req, res, err) => {
  const lang = req.headers["content-language"] || LANGUAGE_TYPE.ENGLISH;

  if (!res) return false;

  return res.status(INTERNAL_SERVER_ERROR_CODE).send({
    status: false,
    statusCode: INTERNAL_SERVER_ERROR_CODE,
    message: MESSAGE[lang][INTERNAL_SERVER_ERROR],
    error: err?.message || err,
  });
};

/**
 * Send Response
 * @param {object object function object}
 */
const validateSchema = async (inputs, res, next, schema) => {
  try {
    const { error } = schema.validate(inputs);

    if (error) {
      return res.status(VALIDATION_CODE).send({
        status: true,
        statusCode: VALIDATION_CODE,
        message: MESSAGE.en.VALIDATION,
        error: error.message,
      });
    }

    next();
  } catch (error) {
    throw error;
  }
};

module.exports = { sendResponse, exceptionError, validateSchema };
