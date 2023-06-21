const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("ecom", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
});

// Models

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = { sequelize, User };
