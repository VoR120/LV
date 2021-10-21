const express = require('express');
const {
    getAllFLanguageLevel,
    findByIdFLanguageLevel,
    findByFlIdFLanguageLevel,
    createFLanguageLevel,
    updateByIdFLanguageLevel,
    removeFLanguageLevel,
    removeAllFLanguageLevel
} = require('../controllers/fLanguageLevelCtrller');
const Router = express.Router();

Router.get('/flanguagelevel', getAllFLanguageLevel);
Router.get('/flanguagelevel/getbyflid/:id', findByFlIdFLanguageLevel);
Router.get('/flanguagelevel/:id', findByIdFLanguageLevel);
Router.post('/flanguagelevel/create', createFLanguageLevel);
Router.put('/flanguagelevel/:id', updateByIdFLanguageLevel);
Router.delete('/flanguagelevel/:id', removeFLanguageLevel);
Router.delete('/flanguagelevel/removeall', removeAllFLanguageLevel);

module.exports = Router;