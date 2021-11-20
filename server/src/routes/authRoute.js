const express = require('express');
const { login, changePassword } = require('../controllers/authCtrller');
const Router = express.Router();

Router.post('/login', login);
Router.put('/changepassword',changePassword)

module.exports = Router;