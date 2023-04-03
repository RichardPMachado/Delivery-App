const { Sale, User, SalesProduct, Product } = require('../models');

// const { CustomError } = require('../errors/custom.error');

/* const getAllSales = async () => { 
  const sales = await Sale.findAll();
  if (!sales) return { type: null, message: 'Sales Error' };
  return { type: 204, message: sales };
}; */

const getAllSales = async () => {
  const sales = await Sale.findAll();
  return { sales };
}; 

const getSaleById = async (id) => {
 const sale = await Sale.findByPk(id);
 const seller = await User.findByPk(sale.sellerId);
 const salesProducts = await SalesProduct.findAll({where: { saleId: sale.id },})
 const products = await Promise.all(salesProducts.map( async (e) => ( await Product.findByPk(e.productId))))
 console.log(products);
 if (!sale) return { type: null, message: 'Sale not found' };
 return { type: 200, message: {
  sale,
  seller,
  salesProducts,
  products }, };
};

const createSale = async (sale) => {
    try {
  const verifyUserId = await User.findOne({where: { email: sale.email },});
  const verifySallerId = await User.findByPk(sale.sellerId);
  console.log(verifyUserId)

  if (!verifyUserId || !verifySallerId) return { type: null, message: 'Not Found' };

  const newSale = await Sale.create(
    {
      userId: verifyUserId.id,
      sellerId: verifySallerId.id,
      totalPrice: sale.totalPrice,
      deliveryAddress: sale.deliveryAddress,
      deliveryNumber: sale.deliveryNumber,
      status: 'Pendente',
    },
  );
  const a = sale.teste.map( async (e) => { await SalesProduct.create(
    {
      saleId: newSale.id,
      productId: e.productId,
      quantity: e.productQuantity,
    },
  );})
  Promise.all(a); 
  if (!newSale) return { type: null, message: 'n' };
  return { type: 201, message: newSale };
} catch(err) {
    console.log(err)
}
};

const attSale = async (id, status) => {
  await Sale.update({ status }, { where: { id } }); 
  const updatedSale = await Sale.findByPk(id);

   return (updatedSale);
};

module.exports = {
  getSaleById,
  getAllSales,
  createSale,
  attSale,
};