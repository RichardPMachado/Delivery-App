const { Sale } = require('../models');
const { User } = require('../models');

// const { CustomError } = require('../errors/custom.error');

const getAllSales = async () => { 
  const sales = await Sale.findAll();
  if (!sales) return { type: null, message: 'Sales Error' };
  return { type: 204, message: sales };
};

const getSaleById = async (saleId) => {
 const sale = await Sale.findByPk(saleId);
 if (!sale) return { type: null, message: 'Sale not found' };
 return { type: 204, message: sale };
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
  console.log(newSale);
  if (!newSale) return { type: null, message: 'n' };
  return { type: 201, message: newSale };
} catch(err) {
    console.log(err)
}
};

module.exports = {
  getSaleById,
  getAllSales,
  createSale,
};