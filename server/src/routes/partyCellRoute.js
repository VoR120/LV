const express = require('express');
const {
    getAllPartyCell,
    findByIdPartyCell,
    createPartyCell,
    updateByIdPartyCell,
    removePartyCell,
    removeAllPartyCell
} = require('../controllers/partyCellCtrller');
const Router = express.Router();

Router.get('/partycell', getAllPartyCell);
Router.get('/partycell/:id', findByIdPartyCell);
Router.post('/partycell/create', createPartyCell);
Router.put('/partycell/:id', updateByIdPartyCell);
Router.delete('/partycell/:id', removePartyCell);
Router.delete('/partycell/removeall', removeAllPartyCell);

module.exports = Router;