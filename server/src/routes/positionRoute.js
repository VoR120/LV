const express = require('express');
const {
    getAllPosition,
    findByIdPosition,
    createPosition,
    updateByIdPosition,
    removePosition,
    removeAllPosition
} = require('../controllers/positionCtrller');
const Router = express.Router();

Router.get('/position', getAllPosition);
Router.get('/position/:id', findByIdPosition);
Router.post('/position/create', createPosition);
Router.put('/position/:id', updateByIdPosition);
Router.delete('/position/:id', removePosition);
Router.delete('/position/removeall', removeAllPosition);

module.exports = Router;