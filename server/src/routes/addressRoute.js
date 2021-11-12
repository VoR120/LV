const express = require('express');
const Router = express.Router();

const { createAddress, getByIdAddress, removeAddress, updateByIdAddress } = require('../controllers/addressCtrller');

Router.get('/address/:id', getByIdAddress)
Router.post('/address/create', createAddress);
Router.put('/address/:id', updateByIdAddress);
Router.delete('/address/:id', removeAddress);

module.exports = Router;