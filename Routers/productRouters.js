const express = require("express");
const productRouter = new express.Router();
const { Product } = require("../models");
const productMapper = require("../mappers/product");

productRouter.post("/products", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      isSuccess: false,
      error: "name is not enter",
    });
  }
  if (!req.body.prize) {
    return res.status(400).json({
      isSuccess: false,
      error: "prize is not enter",
    });
  }
  if (!req.body.description) {
    return res.status(400).json({
      isSuccess: false,
      error: "description is not enter",
    });
  }
  if (!req.body.isOnSale) {
    return res.status(400).json({
      isSuccess: false,
      error: "isONSale is not enter",
    });
  }

  const savedProduct = await Product.create(req.body);

  return res.status(200).json({
    isSuccess: true,
    product: productMapper(savedProduct),
  });
});

module.exports = productRouter;
