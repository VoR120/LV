const express = require('express');
const {
    getAllEthnic,
    findByIdEthnic,
    createEthnic,
    updateByIdEthnic,
    removeEthnic,
    removeAllEthnic
} = require('../controllers/ethnicCtrller');
const Router = express.Router();

Router.get('/ethnic', getAllEthnic);
Router.get('/ethnic/:id', findByIdEthnic);
Router.post('/ethnic/create', createEthnic);
Router.put('/ethnic/:id', updateByIdEthnic);
Router.delete('/ethnic/:id', removeEthnic);
Router.delete('/ethnic/removeall', removeAllEthnic);

module.exports = Router;