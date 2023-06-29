const express = require("express");
const router = new express.Router();
const validator = require("validator");
const { User } = require("../models");
const { encryptPassword, comparePassword } = require("../utils/password");
const { createToken } = require("../utils/jwt");

router.post("/users/signup", async (req, res) => {
  if (
    !validator.isLength(req.body.name, {
      min: 4,
      max: 16,
    })
  ) {
    return res.status(400).json({
      isSuccess: false,
      error: "name is not enter",
    });
  }
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({
      isSuccess: false,
      error: "email is not enter",
    });
  }

  const foundUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!req.body.password) {
    return res.status(400).json({
      isSuccess: false,
      error: "Password is not enter",
    });
  }

  if (foundUser) {
    return res.status(400).json({
      isSuccess: false,
      error: "user already exists",
    });
  }

  req.body.password = encryptPassword(req.body.password);

  const savedUser = await User.create(req.body);

  setTimeout(() => {
    return res.status(200).json({
      isSuccess: true,
    });
  }, 2000);
});

router.post("/users/login", async (req, res) => {
  const foundUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!foundUser) {
    return res
      .status(400)
      .json({ isSuccess: false, error: "Email is incorrect" });
  }

  const checkPass = comparePassword(req.body.password, foundUser.password);

  if (!checkPass) {
    return res
      .status(400)
      .json({ isSuccess: false, error: "Password is incorrect" });
  }

  const token = createToken({ id: foundUser.id, email: foundUser.email });
  foundUser.token = token;
  await foundUser.save();

  const data = {
    id: foundUser.id,
    name: foundUser.name,
    email: foundUser.email,
    token: foundUser.token,
  };

  setTimeout(() => {
    return res.status(200).json({
      isSuccess: true,
      user: data,
    });
  }, 3000);
});

module.exports = router;
