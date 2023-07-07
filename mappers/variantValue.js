const mapper = (data) => {
  if (Array.isArray(data)) return data.map(mapper);
  return {
    id: data.id,
    valueOne: data.valueOne,
    valueTwo: data.valueTwo,
    valueThree: data.valueThree,
  };
};
module.exports = mapper;
