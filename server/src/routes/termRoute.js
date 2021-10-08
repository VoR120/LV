const express = require('express');
const {
    getAllTerm,
    findByIdTerm,
    createTerm,
    updateByIdTerm,
    removeTerm,
    removeAllTerm
} = require('../controllers/termCtrller');
const Router = express.Router();

Router.get('/term', getAllTerm);
Router.get('/term/:id', findByIdTerm);
Router.post('/term/create', createTerm);
Router.put('/term/:id', updateByIdTerm);
Router.delete('/term/:id', removeTerm);
Router.delete('/term/removeall', removeAllTerm);

module.exports = Router;