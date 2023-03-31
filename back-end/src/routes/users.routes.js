const { Router } = require('express');

const { UserController } = require('../database/controller');

const router = Router();

router.post('/login', UserController.loginUser);

router.post('/register', UserController.registerUser);

router.get('/users', UserController.getAllUsers);

module.exports = router;