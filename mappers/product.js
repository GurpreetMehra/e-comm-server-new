const mapper = (data) => {
  if (Array.isArray(data)) return data.map(mapper);
  return {
    name: data.name,
    isOnSale: data.isOnSale,
    description: data.description,
  };
};

module.exports = mapper;
