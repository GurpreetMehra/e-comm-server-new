const express = require("express");
const router = new express.Router();
const { Product, Category, WishList, User } = require("../models");
const productMapper = require("../mappers/product");
const validator = require("validator");
const { tokenIsRequire, tokenIsOptional } = require("../utils/jwt");

// create - /products -POST
// get - /products -get
// getOne - /products/:id

router.post("/wishList", tokenIsRequire, async (req, res) => {
  const productWishList =
    ((req.body.productId = req.body.wishlistProductId),
    (req.body.userId = req.user.id));

  const findOneData = await WishList.findOne({
    where: {
      productId: req.body.productId,
      userId: req.user.id,
    },
  });
  console.log("findOneData", findOneData);
  if (findOneData) {
    const delData = await WishList.destroy({
      where: {
        productId: req.body.productId,
        userId: req.user.id,
      },
    });
    console.log("delData", delData);
  } else {
    const savedProduct = await WishList.create(req.body);
    console.log("save", savedProduct);
  }

  return res.status(200).json({
    isSuccess: true,
  });
});

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

  if (
    req.body.rating &&
    !validator.isFloat(req.body.rating, {
      min: 0,
      max: 5,
    })
  ) {
    return res.status(400).json({
      isSuccess: false,
      error: "error",
    });
  }

  const saveImages =
    ((req.body.img1 = req.body.Images[0]),
    (req.body.img2 = req.body.Images[1]),
    (req.body.img3 = req.body.Images[2]),
    (req.body.img4 = req.body.Images[3]));

  const savedProduct = await Product.create(req.body);

  return res.status(200).json({
    isSuccess: true,
    product: productMapper(savedProduct),
  });
});

router.get("/", tokenIsOptional, async (req, res) => {
  const include = [{ model: Category, attributes: ["name"] }];

  if (req.user) {
    include.push({
      model: WishList,
      where: {
        userId: req.user.id,
      },
      required: false,
    });
  }
  const productGet = await Product.findAll({
    include,
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
    productOne: productMapper(findOneData),
  });
});

router.put("/:id", async (req, res) => {
  const product = await Product.findAll({
    where: {},
  });

  if (!product) {
    return res.status(400).json({
      isSuccess: false,
      error: "error",
    });
  }

  if (
    req.body.name &&
    !validator.isLength(req.body.name, {
      min: 0,
      max: 15,
    })
  ) {
    return res.status(400).json({
      isSuccess: false,
      error: "error",
    });
  }

  if (req.body.price && !req.body.price) {
    return res.status(400).json({
      isSuccess: false,
      error: "error",
    });
  }

  if (req.body.description && !req.body.description) {
    return res.status(400).json({
      isSuccess: false,
      error: "error",
    });
  }

  if (req.body.isOnSale && !req.body.isOnSale) {
    return res.status(400).json({
      isSuccess: false,
      error: "error",
    });
  }

  if (req.body.salePercentage && !req.body.salePercentage) {
    return res.status(400).json({
      isSuccess: false,
      error: "error",
    });
  }

  if (req.body.Images && !req.body.Images) {
    return res.status(400).json({
      isSuccess: false,
      error: "error",
    });
  }

  if (req.body.categoryId && !req.body.categoryId) {
    return res.status(400).json({
      isSuccess: false,
      error: "error",
    });
  }

  if (
    req.body.rating &&
    !validator.isFloat(req.body.rating, {
      min: 0,
      max: 5,
    })
  ) {
    return res.status(400).json({
      isSuccess: false,
      error: "error",
    });
  }
  const saveImages =
    ((req.body.img1 = req.body.Images[0]),
    (req.body.img2 = req.body.Images[1]),
    (req.body.img3 = req.body.Images[2]),
    (req.body.img4 = req.body.Images[3]));

  const dataPut = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    isOnSale: req.body.isOnSale,
    rating: req.body.rating,
    salePercentage: req.body.salePercentage,
    img1: req.body.img1,
    img2: req.body.img2,
    img3: req.body.img3,
    img4: req.body.img4,
    Images: req.body.Images,
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
