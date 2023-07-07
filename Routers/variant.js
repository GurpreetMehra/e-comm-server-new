const express = require("express");
const router = new express.Router();
const { Variant } = require("../models");
const variantMapper = require("../mappers/variant");

router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      isSuccess: false,
      error: "name is not enter",
    });
  }

  const savedCategory = await Variant.create(req.body);

  return res.status(200).json({
    isSuccess: true,
    category: variantMapper(savedCategory),
  });
});

router.get("/", async (req, res) => {
  const categoryGet = await Variant.findAll({
    where: {},
  });

  const CategoryGetSave = variantMapper(categoryGet);

  return res.status(200).json({
    isSuccess: true,
    CategoryData: CategoryGetSave,
  });
});

router.get("/:id", async (req, res) => {
  const findOneData = await Variant.findOne({
    where: {
      id: req.params.id,
    },
  });

  return res.status(200).json({
    isSuccess: true,
    categoryOne: variantMapper(findOneData),
  });
});

router.put("/:id", async (req, res) => {
  const category = await Variant.findAll({
    where: {},
  });

  const dataPut = {
    name: req.body.name,
  };
  const updateData = await Variant.update(dataPut, {
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({
    isSuccess: true,
    Category: variantMapper(updateData),
  });
});

router.delete("/:id", async (req, res) => {
  const delData = await Variant.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({
    isSuccess: true,
    Category: variantMapper(delData),
  });
});

module.exports = router;
