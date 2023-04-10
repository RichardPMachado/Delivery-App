const { Product } = require('../models');

const getProducts = async () => {
  const products = await Product.findAll();
  console.log(products);

  return { status: 200, payload: products };
};
module.exports = {
  getProducts,
};