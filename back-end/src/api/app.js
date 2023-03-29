const express = require('express');
const user = require('../database/controller/User');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.post('/login', user.loginUser);

module.exports = app;
