const service = require('../service/Products');

const getProducts = async (_req, res) => {
  const { status, payload } = await service.getProducts();

  return res.status(status).json(payload);
};


module.exports = {
  getProducts,
};
