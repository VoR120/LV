const express = require('express');
const {
    getAllReligion,
    findByIdReligion,
    createReligion,
    updateByIdReligion,
    removeReligion,
    removeAllReligion
} = require('../controllers/religionCtrller');
const Router = express.Router();

Router.get('/religion', getAllReligion);
Router.get('/religion/:id', findByIdReligion);
Router.post('/religion/create', createReligion);
Router.put('/religion/:id', updateByIdReligion);
Router.delete('/religion/:id', removeReligion);
Router.delete('/religion/removeall', removeAllReligion);

module.exports = Router;