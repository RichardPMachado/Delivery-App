const express = require('express');
const cors = require('cors');
const user = require('../database/controller/User');
const products = require('../database/controller/Products');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.get('/images/skol_lata_350ml.jpg', (_req, res) => res.status(200).json(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:'
    + 'ANd9GcRCWH_giSFQC92IphgXXa4veYevpMsD90NHQYG5u9GX&s',
));
app.post('/login', user.loginUser);

app.post('/register', user.registerUser);

app.get('/products', products.getProducts);

module.exports = app;
