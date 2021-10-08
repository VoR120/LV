const express = require('express');
const {
    getAllPolitics,
    findByIdPolitics,
    createPolitics,
    updateByIdPolitics,
    removePolitics,
    removeAllPolitics
} = require('../controllers/politicsCtrller');
const Router = express.Router();

Router.get('/politics', getAllPolitics);
Router.get('/politics/:id', findByIdPolitics);
Router.post('/politics/create', createPolitics);
Router.put('/politics/:id', updateByIdPolitics);
Router.delete('/politics/:id', removePolitics);
Router.delete('/politics/removeall', removeAllPolitics);

module.exports = Router;