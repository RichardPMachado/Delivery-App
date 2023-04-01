const express = require('express');
const cors = require('cors');
const { UserRoutes, ProductRoutes, SaleRoutes } = require('../routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(UserRoutes);
app.use(ProductRoutes);
app.use(SaleRoutes);

module.exports = app;
