const router = require("express").Router();

/* | ~ ~ ~ ~ ~ ~ ~ ~ ~ ROUTES ~ ~ ~ ~ ~ ~ ~ ~ ~ | */
const AllRoutes = {
  User: Object.values(require("./user")),
  Common: Object.values(require("./common")),
};

Object.keys(AllRoutes).map((route) =>
  router.use(`/${route.toLocaleLowerCase()}`, AllRoutes[route])
);

module.exports = router;
