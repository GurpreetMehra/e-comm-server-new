const jwt = require("jsonwebtoken");
const secretKey = "secretKey";

const createToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: "300s" });
};

module.exports = { createToken };
