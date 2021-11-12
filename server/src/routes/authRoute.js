const express = require('express');
const { login } = require('../controllers/authCtrller');
const Router = express.Router();

Router.post('/login', login);

module.exports = Router;