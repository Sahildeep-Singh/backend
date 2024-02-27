require("dotenv").config();

// validate dotenv
require("../lib/validate-fun").envValidate(process.env);

const PROJECT = {
  NAME: process.env.PROJECT_NAME,
};

const SERVER = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};

const DB = {
  USER_NAME: process.env.MONGO_USER_NAME,
  PASS: process.env.MONGO_PASSWORD,
  IP: process.env.MONGO_IP,
  DB_NAME: process.env.MONGO_DB_NAME,
};
DB.MONGO_URI =
  DB.USER_NAME && DB.PASS && DB.IP
    ? `mongodb://${DB.USER_NAME}:${DB.PASS}@${DB.IP}:27017/${DB.DB_NAME}`
    : `mongodb://localhost:27017/${DB.DB_NAME}`;

const URL = {
  FRONTEND_URL: process.env.FRONTEND_URL,
  BACKEND_URL: process.env.BACKEND_URL,
};

const MONGOOSE_PARAMS = {
  LIMIT: 10,
  OFFSET: 0,
  SORT: "-createdAt",
  CONDITION: {},
  AGGREGATE: [{ $match: {} }],
  POPULATE: [],
  AGG_SORT: { createdAt: -1 },
};

const CRYPTO = {
  ALGORITHM: process.env.CRYPTO_ALGORITHM,
};

const JWT_OPTIONS = {
  ALGORITHM: process.env.JWT_ALGORITHM,
  SECRET_KEY: process.env.JWT_SECRET_KEY,
  EXPIRES_IN: "12h",
  ERROR_MSG: "jwt expired",
};

module.exports = {
  DB,
  URL,
  SERVER,
  CRYPTO,
  PROJECT,
  JWT_OPTIONS,
  MONGOOSE_PARAMS,
};
