const express = require("express");
const validator = require("validator");
const { sequelize, User } = require("./models");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  encryptPassword,
  decryptPassword,
  comparePassword,
} = require("./utils/password");
const { location } = require("express/lib/response");
const jwt = require("./utils/jwt");
const { createToken } = require("./utils/jwt");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/users/signup", async (req, res) => {
  if (
    !validator.isLength(req.body.name, {
      min: 4,
      max: 16,
    })
  ) {
    return res.json({ isSuccess: false, error: "name is not enter" });
  }
  if (!validator.isEmail(req.body.email)) {
    return res.json({ isSuccess: false, error: "email is not enter" });
  }
  if (!req.body.password) {
    return res.json({ isSuccess: false, error: "Password is not enter" });
  }

  const foundUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (foundUser) {
    return res.json({ isSuccess: false, error: "user already axist" });
  }

  req.body.password = encryptPassword(req.body.password);
  const savedUser = await User.create(req.body);

  res.json({ isSuccess: true });
  console.log(savedUser);
});

app.post("/users/login", async (req, res) => {
  const foundUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!foundUser) {
    return res.json({ isSuccess: false, error: "user not found" });
  }
  const checkPass = comparePassword(req.body.password, foundUser.password);
  if (!checkPass) {
    return res.json({ isSuccess: false, error: "Password is incorrect" });
  }

  const token = createToken({ id: foundUser.id, email: foundUser.email });
  console.log(token);
  foundUser.token = token;
  await foundUser.save();

  res.json({
    isSuccess: true,
    user: foundUser,
  });
});

try {
  sequelize.sync({ alter: true }).then(() => {
    console.log("Connection has been established successfully.");
    app.listen(4000, () => {
      console.log("Server is running at 4000");
    });
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
