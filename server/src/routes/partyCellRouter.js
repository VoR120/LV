const express = require('express');
const {
    getAllPartyCell,
    findByIdPartyCell,
    createPartyCell,
    updatePartyCell,
    deletePartyCell
} = require('../controllers/partyCelCtrller');
const Router = express.Router();

Router.get('/', getAllPartyCell);
Router.get('/:id', findByIdPartyCell);
Router.post('/create', createPartyCell);
Router.put('/:id', updatePartyCell);
Router.delete('/:id', deletePartyCell);
Router.delete('/deleteall', deletePartyCell);

module.exports = Router;