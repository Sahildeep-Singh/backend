const router = require("express").Router();

/* | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ AUTH ~ ~ ~ ~ ~ ~ ~ ~ ~ ~| */
const { requireAuth } = require("../../../../auth/authentication");

/* | ~ ~ ~ ~ ~ ~ CONTROLLER FUNCTIONS ~ ~ ~ ~ ~ | */
const {
  users,
  login,
  profile,
  register,
  updateProfile,
} = require("../controller/auth");

/* | ~ ~ ~ ~ ~ ~ VALIDATION FUNCTIONS ~ ~ ~ ~ ~ | */
const {
  validateLogin,
  validateUsers,
  validateRegister,
  validateUpdateProfile,
} = require("../validation/auth");

/* --------------------------------------------------
 |                                                  |
 | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ROUTES ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ |
 |                                                  |
 --------------------------------------------------- */

router.post("/login", validateLogin, login);

router.post("/register", validateRegister, register);

router.get("/profile", requireAuth(), profile);

router.patch(
  "/update/profile",
  requireAuth(),
  validateUpdateProfile,
  updateProfile
);

router.get("/users", requireAuth(), validateUsers, users);

module.exports = router;
