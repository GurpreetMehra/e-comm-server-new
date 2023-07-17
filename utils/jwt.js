const jwt = require("jsonwebtoken");
const { User } = require("../models");
const secretKey = "secretKey";

const createToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: "300s" });
};

const tokenIsRequire = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({
      isSuccess: false,
      error: "token is required",
    });
  }

  let decoded = jwt.decode(token);

  if (decoded === null) {
    return res.status(400).json({
      isSuccess: false,
      error: "token is invalid",
    });
  }
  const findOneData = await User.findOne({
    where: {
      id: decoded.id,
    },
  });

  if (!findOneData) {
    return res.status(403).json({
      isSuccess: false,
      error: "token is invalid",
    });
  }

  req.user = findOneData;

  next();
};

const tokenIsOptional = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    tokenIsRequire(req, res, next);
  } else {
    next();
  }
};

module.exports = { createToken, tokenIsRequire, tokenIsOptional };
