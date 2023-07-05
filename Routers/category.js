const express = require("express");
const router = new express.Router();
const { Category, Product } = require("../models");
const categoryMapper = require("../mappers/category");

router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      isSuccess: false,
      error: "name is not enter",
    });
  }

  const savedCategory = await Category.create(req.body);

  return res.status(200).json({
    isSuccess: true,
    category: categoryMapper(savedCategory),
  });
});

router.get("/", async (req, res) => {
  const categoryGet = await Category.findAll({
    where: {},
  });

  const CategoryGetSave = categoryMapper(categoryGet);

  return res.status(200).json({
    isSuccess: true,
    CategoryData: CategoryGetSave,
  });
});

router.get("/:id", async (req, res) => {
  const findOneData = await Category.findOne({
    where: {
      id: req.params.id,
    },
  });

  return res.status(200).json({
    isSuccess: true,
    categoryOne: categoryMapper(findOneData),
  });
});

router.put("/:id", async (req, res) => {
  const category = await Category.findAll({
    where: {},
  });

  const dataPut = {
    name: req.body.name,
  };
  const updateData = await Category.update(dataPut, {
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({
    isSuccess: true,
    Category: categoryMapper(updateData),
  });
});

router.delete("/:id", async (req, res) => {
  const delData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({
    isSuccess: true,
    Category: categoryMapper(delData),
  });
});

module.exports = router;
