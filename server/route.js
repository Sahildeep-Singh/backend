const router = require("express").Router();

/* | ~ ~ ~ ~ ~ ~ ~ ~ ~ ROUTES ~ ~ ~ ~ ~ ~ ~ ~ ~ | */
router.use("/v1", require("./modules/v1/"));

module.exports = router;
