const express = require("express");
const router = new express.Router();
const { Product } = require("../models");
const productMapper = require("../mappers/product");

// create - /products -POST
// get - /products -get
// getOne - /products/:id

router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      isSuccess: false,
      error: "name is not enter",
    });
  }
  if (!req.body.price) {
    return res.status(400).json({
      isSuccess: false,
      error: "price is not enter",
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
  console.log(savedProduct);
  return res.status(200).json({
    isSuccess: true,
    product: productMapper(savedProduct),
  });
});

router.get("/", async (req, res) => {
  const productGet = await Product.findAll({
    where: {},
  });

  const productGetSave = productMapper(productGet);

  return res.status(200).json({
    isSuccess: true,
    productData: productGetSave,
  });
});

router.get("/:id", async (req, res) => {
  const findOneData = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  return res.status(200).json({
    isSuccess: true,
    product: productMapper(findOneData),
  });
});

router.put("/:id", async (req, res) => {
  const dataPut = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    isOnSale: req.body.isOnSale,
  };
  const updateData = await Product.update(dataPut, {
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({
    isSuccess: true,
    product: productMapper(updateData),
  });
});

router.delete("/:id", async (req, res) => {
  const delData = await Product.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({
    isSuccess: true,
    product: productMapper(delData),
  });
});

module.exports = router;
