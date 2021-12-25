const express = require('express');
const {
    getAllGrade,
    findByIdGrade,
    createGrade,
    updateByIdGrade,
    removeGrade,
    findOneGrade,
    removeAllGrade
} = require('../controllers/gradeCtrller');
const Router = express.Router();

Router.get('/grade', getAllGrade);
Router.get('/grade/findone/:id', findOneGrade);
Router.get('/grade/:id', findByIdGrade);
Router.post('/grade/create', createGrade);
Router.put('/grade/:id', updateByIdGrade);
Router.delete('/grade/:id', removeGrade);
Router.delete('/grade/removeall', removeAllGrade);

module.exports = Router;