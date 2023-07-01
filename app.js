const express = require("express");
const app = express();
const { sequelize } = require("./models");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouters = require("./Routers/authRouters");
const productRouters = require("./Routers/productRouters");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(authRouters);
app.use("/products", productRouters);

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
