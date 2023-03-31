const { Router } = require('express');

const { ProductsController } = require('../database/controller');

const router = Router();

router.get('/products', ProductsController.getProducts);

module.exports = router;