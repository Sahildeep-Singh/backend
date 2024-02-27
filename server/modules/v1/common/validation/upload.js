const joi = require("joi");

/* | ~ ~ ~ ~ ~ ~ ~ ~ LIB FUNCTIONS ~ ~ ~ ~ ~ ~ ~ ~ | */
const { validateSchema } = require("../../../../lib/response-fun");

/* --------------------------------------------------
 |                                                  |
 | ~ ~ ~ ~ ~ ~ ~ VALIDATION FUNCTIONS ~ ~ ~ ~ ~ ~ ~ |
 |                                                  |
 --------------------------------------------------- */

exports.validateUpload = async (req, res, next) => {
  const fileObject = joi
    .object()
    .keys({
      file: joi.object().required(),
      path: joi.string().valid("profile").required(),
    })
    .unknown();
  return await validateSchema({ ...req, ...req.body }, res, next, fileObject);
};
