const mapper = (data) => {
  if (Array.isArray(data)) return data.map(mapper);
  return {
    id: data.id,
    name: data.name,
    isOnSale: data.isOnSale,
    description: data.description,
    price: data.price,
    checkPoint: data.checkPoint,
    salePercentage: data.salePercentage,
    rating: data.rating,
  };
};
module.exports = mapper;
