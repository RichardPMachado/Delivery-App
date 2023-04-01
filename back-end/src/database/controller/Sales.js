const { SaleService } = require('../service');

// const { CustomError } = require('../errors/custom.error');

const getAllSales = async (_req, res) => {
  const { type, message } = await SaleService.getAllSales();
  if (type === null) {
    return res.status(404).json({ message });
  }
  return res.status(type).json({ message });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await SaleService.getSaleById(id);
  if (type === null) return res.status(404).json({ message });
  return res.status(type).json({ message });
};

const createSale = async (req, res) => {
  const sale = req.body;
  console.log(sale);
  const { type, message } = await SaleService.createSale(sale);
  if (type === null) return res.status(404).json({ message });
  return res.status(type).json(message);
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};