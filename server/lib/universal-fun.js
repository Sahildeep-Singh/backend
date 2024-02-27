const bcrypt = require("bcrypt"),
  crypto = require("crypto");

/* | ~ ~ ~ ~ ~ ~ ~ ~ CONFIG'S ~ ~ ~ ~ ~ ~ ~ | */
const {
  CRYPTO: { ALGORITHM },
  JWT_OPTIONS: { SECRET_KEY },
} = require("../config/config");

const KEY = crypto
  .createHash("sha512")
  .update(SECRET_KEY)
  .digest("hex")
  .substring(0, 32);

const ENCRYPTION_IV = crypto
  .createHash("sha512")
  .update(SECRET_KEY)
  .digest("hex")
  .substring(0, 16);

/**
 * @function <b>hashPassword</b><br>
 * Hash Password
 * @param {String} plainTextPassword Unsecured Password
 * @return {String} Secured Password
 */
const hashPassword = async (plainTextPassword) => {
  const saltRounds = 10;
  return bcrypt.hashSync(plainTextPassword, saltRounds);
};

/**
 * @function <b>comparePassword</b><br>Verify Password
 * @param {String} plainTextPassword Password to be checked
 * @param {String} passwordhash Hashed Password
 */
const comparePassword = async (plainTextPassword, passwordhash) => {
  return bcrypt.compareSync(plainTextPassword, passwordhash);
};

/**
 * Encrypts data
 * @param {string} data - text to encrypt
 */
const encrypt = (data) => {
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, ENCRYPTION_IV);
  return Buffer.from(
    cipher.update(data, "utf8", "hex") + cipher.final("hex")
  ).toString("base64"); // Encrypts data and converts to hex and base64
};

/**
 * Decrypts data
 * @param {string} encryptedData - text to decrypt
 */
const decrypt = (encryptedData) => {
  const buff = Buffer.from(encryptedData, "base64");
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, ENCRYPTION_IV);
  return (
    decipher.update(buff.toString("utf8"), "hex", "utf8") +
    decipher.final("utf8")
  ); // Decrypts data and converts to utf8
};

module.exports = {
  encrypt,
  decrypt,
  hashPassword,
  comparePassword,
};
