/* | ~ ~ ~ ~ ~ ~ ~ ~ MODELS ~ ~ ~ ~ ~ ~ ~ ~ | */
const User = require("../../../../models/user");

/* | ~ ~ ~ ~ ~ ~ ~ ~ CONSTANTS ~ ~ ~ ~ ~ ~ ~ ~ | */
const {
  SUCCESS_CODE,
  UPDATED_CODE,
  NOT_FOUND_CODE,
  UNAUTHORIZED_CODE,
} = require("../../../../constant/statusCode");
const MSG = require("../../../../constant/messages");

/* | ~ ~ ~ ~ ~ ~ ~ ~ LIB FUNCTIONS ~ ~ ~ ~ ~ ~ ~ ~ | */
const {
    sendResponse,
    exceptionError,
  } = require("../../../../lib/response-fun"),
  {
    Create,
    FindOne,
    FindAll,
    FindById,
    Aggregate,
    FindOneAndUpdate,
    FindByIdAndUpdate,
  } = require("../../../../lib/mongoose-fun"),
  { hashPassword, comparePassword } = require("../../../../lib/universal-fun"),
  { jwtSign } = require("../../../../lib/jwt-fun");

/* --------------------------------------------------
 |                                                  |
 | ~ ~ ~ ~ ~ ~ ~ ~ ROUTES FUNCTIONS ~ ~ ~ ~ ~ ~ ~ ~ |
 |                                                  |
 --------------------------------------------------- */

exports.register = async (req, res) => {
  try {
    const { email, password, lat, long } = req.body;

    const user = await FindOne(User, { email });

    if (user)
      return sendResponse(
        req,
        res,
        UNAUTHORIZED_CODE,
        MSG.USERNAME_ALREADY_EXISTS
      );

    req.body.password = await hashPassword(password);

    const data = await Create(User, {
      ...req.body,
      location: {
        coordinates: [long, lat],
      },
    });

    const token = await jwtSign(data);

    const updatedUser = await FindByIdAndUpdate(User, data._id, {
      $set: { accessToken: token },
    });

    return sendResponse(req, res, SUCCESS_CODE, MSG.REGISTER_SUCCESSFULLY, {
      token: updatedUser.accessToken,
    });
  } catch (error) {
    return exceptionError(req, res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await FindOne(User, { email });

    if (!user) {
      return sendResponse(req, res, NOT_FOUND_CODE, MSG.USER_NOT_EXISTS);
    }

    if (!(await comparePassword(password, user.password))) {
      return sendResponse(req, res, UNAUTHORIZED_CODE, MSG.INVALID_CREDS);
    }

    const token = await jwtSign(user);

    const updatedUser = await FindOneAndUpdate(
      User,
      { _id: user._id },
      { $set: { accessToken: token } }
    );

    return sendResponse(req, res, SUCCESS_CODE, MSG.LOGIN_SUCCESSFULLY, {
      token: updatedUser.accessToken,
    });
  } catch (error) {
    return exceptionError(req, res, error);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    await FindByIdAndUpdate(User, req.user._id, {
      $set: req.body,
    });

    return sendResponse(req, res, UPDATED_CODE, MSG.UPDATED_SUCCESSFULLY);
  } catch (error) {
    return exceptionError(req, res, error);
  }
};

exports.profile = async (req, res) => {
  try {
    const data = await FindById(User, req.user._id);

    return sendResponse(req, res, SUCCESS_CODE, MSG.FETCHED_SUCCESSFULLY, data);
  } catch (error) {
    return exceptionError(req, res, error);
  }
};

exports.users = async (req, res) => {
  try {
    const { lat, long } = req.query;

    const data = await Aggregate(User, [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(long), parseFloat(lat)],
          },
          distanceField: "distance",
          spherical: true,
          distanceMultiplier: 0.001, // Convert distance to kilometers
        },
      },
      { $match: { _id: { $ne: req.user._id } } },
      { $sort: { distance: 1 } },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phone: 1,
          mobile: 1,
          zipCode: 1,
          profile: 1,
          location: 1,
          distance: 1,
          createdAt: 1,
        },
      },
    ]);

    return sendResponse(req, res, SUCCESS_CODE, MSG.FETCHED_SUCCESSFULLY, data);
  } catch (error) {
    return exceptionError(req, res, error);
  }
};
