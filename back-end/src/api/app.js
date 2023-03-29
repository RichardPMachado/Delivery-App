const express = require('express');
const cors = require('cors');
const user = require('../database/controller/User');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.post('/login', user.loginUser);

app.post('/register', user.registerUser);

module.exports = app;
