const bcrypt = require("bcrypt");
const saltRounds = 10;

const encryptPassword = (encryptPassword) => {
  // console.log(encryptPassword);
  const hash = bcrypt.hashSync(encryptPassword, saltRounds);
  return hash;
};
const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
module.exports = { encryptPassword, comparePassword };
