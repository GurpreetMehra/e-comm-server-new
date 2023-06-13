const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sql12625551", "sql12625551", "Bx2zgf43Pu", {
  host: "sql12.freesqldatabase.com",
  dialect: "mysql",
  port: 3306,
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
  },
  {
    // Other model options go here
  }
);

module.exports = { sequelize, User };
