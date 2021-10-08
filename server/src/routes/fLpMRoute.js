const express = require('express');
const {
    getAllfLpM,
    findByIdfLpM,
    createfLpM,
    updateByIdfLpM,
    removefLpM,
    removeAllfLpM
} = require('../controllers/fLpMCtrller');
const Router = express.Router();

Router.get('/flpm', getAllfLpM);
Router.get('/flpm/:id', findByIdfLpM);
Router.post('/flpm/create', createfLpM);
Router.put('/flpm/:id', updateByIdfLpM);
Router.delete('/flpm/:id', removefLpM);
Router.delete('/flpm/removeall', removeAllfLpM);

module.exports = Router;