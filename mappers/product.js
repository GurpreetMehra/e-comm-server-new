const categoryMapper = require("./category");

const mapper = (data) => {
  if (Array.isArray(data)) return data.map(mapper);
  const returnData = {
    id: data.id,
    name: data.name,
    isOnSale: data.isOnSale,
    description: data.description,
    price: data.price,
    checkPoint: data.checkPoint,
    salePercentage: data.salePercentage,
    rating: data.rating,
    Images: [data.img1, data.img2, data.img3, data.img4],
    categoryId: data.categoryId,
  };
  if (data.category) {
    returnData.category = categoryMapper(data.category);
  }
  return returnData;
};
module.exports = mapper;
