const mapper = (data) => {
  if (Array.isArray(data)) return data.map(mapper);
  return {
    id: data.id,
    name: data.name,
  };
};
module.exports = mapper;
