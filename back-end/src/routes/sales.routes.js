const { Router } = require('express');

const { SalesController } = require('../database/controller');

const jwtValidation = require('../utils/jwt.validation');

const router = Router();

router.get('/sales', SalesController.getAllSales);

router.get('/sale/:id', SalesController.getSaleById);

router.post('/customer/checkout', jwtValidation, SalesController.createSale);

router.put('/sale/:id', SalesController.attSale);

module.exports = router;