const express = require('express');
const {
    getAllIT,
    findByIdIT,
    createIT,
    updateByIdIT,
    removeIT,
    removeAllIT
} = require('../controllers/itCtrller');
const Router = express.Router();

Router.get('/it', getAllIT);
Router.get('/it/:id', findByIdIT);
Router.post('/it/create', createIT);
Router.put('/it/:id', updateByIdIT);
Router.delete('/it/:id', removeIT);
Router.delete('/it/removeall', removeAllIT);

module.exports = Router;