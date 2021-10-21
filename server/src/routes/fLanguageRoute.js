const express = require('express');
const {
    getAllFLanguage,
    findByIdFLanguage,
    createFLanguage,
    updateByIdFLanguage,
    removeFLanguage,
    removeAllFLanguage,
    getIdFromNameFLanguage,
    getNameFromIdFLanguage
} = require('../controllers/fLanguageCtrller');
const Router = express.Router();

Router.get('/flanguage', getAllFLanguage);
Router.get('/flanguage/:id', findByIdFLanguage);
Router.post('/flanguage/getid', getIdFromNameFLanguage);
Router.post('/flanguage/getname', getNameFromIdFLanguage);
Router.post('/flanguage/create', createFLanguage);
Router.put('/flanguage/:id', updateByIdFLanguage);
Router.delete('/flanguage/:id', removeFLanguage);
Router.delete('/flanguage/removeall', removeAllFLanguage);

module.exports = Router;