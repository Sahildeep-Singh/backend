const joi = require("joi");

/* | ~ ~ ~ ~ ~ ~ ~ ~ LIB FUNCTIONS ~ ~ ~ ~ ~ ~ ~ ~ | */
const { validateSchema } = require("../../../../lib/response-fun");

/* --------------------------------------------------
 |                                                  |
 | ~ ~ ~ ~ ~ ~ ~ VALIDATION FUNCTIONS ~ ~ ~ ~ ~ ~ ~ |
 |                                                  |
 --------------------------------------------------- */

exports.validateRegister = async (req, res, next) => {
  const loginSchema = joi.object().keys({
    name: joi.string().trim().required(),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().required(),
    phone: joi.string().trim().optional(),
    mobile: joi.string().trim().required(),
    zipCode: joi.string().trim().required(),
    profile: joi.string().trim().optional(),
    lat: joi.number().required(),
    long: joi.number().required(),
  });
  return await validateSchema(req.body, res, next, loginSchema);
};

exports.validateLogin = async (req, res, next) => {
  const loginSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  return await validateSchema(req.body, res, next, loginSchema);
};

exports.validateUpdateProfile = async (req, res, next) => {
  const Schema = joi.object().keys({
    email: joi.string().trim().email().optional(),
    phone: joi.string().trim().optional(),
    mobile: joi.string().trim().optional(),
    zipCode: joi.string().trim().optional(),
    profile: joi.string().trim().optional(),
    location: joi
      .object({
        coordinates: joi.array().items(joi.number()).optional(),
        formattedAddress: joi.string().allow(""),
      })
      .optional(),
  });
  return await validateSchema(req.body, res, next, Schema);
};

exports.validateUsers = async (req, res, next) => {
  const Schema = joi.object().keys({
    lat: joi.number().required(),
    long: joi.number().required(),
  });
  return await validateSchema(req.query, res, next, Schema);
};
