const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("ecom", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
});

// Models

const User = sequelize.define("user", {
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
});

const Product = sequelize.define("product", {
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
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  salePercentage: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  isOnSale: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  checkPoint: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img4: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Category = sequelize.define("category", {
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
});

const Variant = sequelize.define("variant", {
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
});

const VariantValue = sequelize.define("variantValue", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  valueOne: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valueTwo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valueThree: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const WishList = sequelize.define("wishList", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

// "Relations"

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(WishList);
WishList.belongsTo(Product);

User.hasMany(WishList);
WishList.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Product,
  Category,
  Variant,
  VariantValue,
  WishList,
};
