const { Router } = require('express');

const { UserController } = require('../database/controller');

const jwtValidation = require('../utils/jwt.validation');

const router = Router();

router.post('/login', UserController.loginUser);

router.post('/register', UserController.registerUser);

router.post('/adm/register', jwtValidation, UserController.admRegisterUser);

router.get('/users', UserController.getAllUsers);

router.get('/user', UserController.GetUserByEmail);

module.exports = router;