const express = require('express');
const {
    getAllType,
    findByIdType,
    createType,
    updateByIdType,
    removeType,
    removeAllType
} = require('../controllers/typeCtrller');
const Router = express.Router();

Router.get('/type', getAllType);
Router.get('/type/:id', findByIdType);
Router.post('/type/create', createType);
Router.put('/type/:id', updateByIdType);
Router.delete('/type/:id', removeType);
Router.delete('/type/removeall', removeAllType);

module.exports = Router;