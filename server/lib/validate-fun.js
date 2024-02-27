const Joi = require("joi");

// Define a schema to validate environment variables
const envSchema = Joi.object({
  // PROJECT
  PROJECT_NAME: Joi.string().required(),

  // SERVER
  PORT: Joi.string().required(),
  NODE_ENV: Joi.string().required(),

  // DATA-BASE
  MONGO_USER_NAME: Joi.string().optional(),
  MONGO_PASSWORD: Joi.string().optional(),
  MONGO_IP: Joi.string().optional(),
  MONGO_DB_NAME: Joi.string().required(),

  // URL
  FRONTEND_URL: Joi.string().required(),
  BACKEND_URL: Joi.string().required(),

  // JWT
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_ALGORITHM: Joi.string().required(),

  // CRYPTO
  CRYPTO_ALGORITHM: Joi.string().required(),
}).unknown();

exports.envValidate = (object) => {
  const { error } = envSchema.validate(object);
  if (error) {
    console.error(error.details[0].message);
    process.exit(1);
  }
};
