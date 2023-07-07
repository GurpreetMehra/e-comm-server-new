const express = require("express");
const router = new express.Router();
const { VariantValue } = require("../models");
const variantValueMapper = require("../mappers/variantValue");

router.post("/", async (req, res) => {
  const savedCategory = await VariantValue.create(req.body);

  return res.status(200).json({
    isSuccess: true,
    category: variantValueMapper(savedCategory),
  });
});

router.get("/", async (req, res) => {
  const categoryGet = await VariantValue.findAll({
    where: {},
  });

  const CategoryGetSave = variantValueMapper(categoryGet);

  return res.status(200).json({
    isSuccess: true,
    CategoryData: CategoryGetSave,
  });
});

router.get("/:id", async (req, res) => {
  const findOneData = await VariantValue.findOne({
    where: {
      id: req.params.id,
    },
  });

  return res.status(200).json({
    isSuccess: true,
    categoryOne: variantValueMapper(findOneData),
  });
});

router.put("/:id", async (req, res) => {
  const category = await VariantValue.findAll({
    where: {},
  });

  const dataPut = {
    valueOne: req.body.valueOne,
  };
  const updateData = await VariantValue.update(dataPut, {
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({
    isSuccess: true,
    Category: variantValueMapper(updateData),
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
    Category: variantValueMapper(delData),
  });
});

module.exports = router;
