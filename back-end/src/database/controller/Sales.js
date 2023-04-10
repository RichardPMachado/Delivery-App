const { SaleService } = require('../service');

// const { CustomError } = require('../errors/custom.error');

/* const getAllSales = async (_req, res) => {
  const { type, message } = await SaleService.getAllSales();
  if (type === null) {
    return res.status(404).json({ message });
  }
  return res.status(type).json({ message });
}; */

const getAllSalesByUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sales = await SaleService.getAllSalesByUser(id);
  return res.status(200).json(sales);
};

const getAllSales = async (_req, res) => {
  const sales = await SaleService.getAllSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await SaleService.getSaleById(id);
  if (type === null) return res.status(404).json({ message });
  return res.status(type).json(message);
};

const createSale = async (req, res) => {
  const sale = req.body;
  const { type, message } = await SaleService.createSale(sale);
  if (type === null) return res.status(404).json({ message });
  return res.status(type).json(message);
};

const attSale = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const newSale = await SaleService.attSale(id, status);

  return res.status(200).json(newSale);
};

module.exports = {
  getAllSalesByUser,
  getSaleById,
  createSale,
  attSale,
  getAllSales,
};