const express = require('express');
const {
    getAllDiscipline,
    findByIdDiscipline,
    createDiscipline,
    updateByIdDiscipline,
    removeDiscipline,
    removeAllDiscipline,
    findByTypeDiscipline,
    findByTypeIdDiscipline
} = require('../controllers/disciplineCtrller');
const Router = express.Router();

Router.get('/discipline', getAllDiscipline);
Router.get('/discipline/getbytypeid/:id', findByTypeIdDiscipline);
Router.get('/discipline/:id', findByIdDiscipline);
Router.post('/discipline/create', createDiscipline);
Router.put('/discipline/:id', updateByIdDiscipline);
Router.delete('/discipline/:id', removeDiscipline);
Router.delete('/discipline/removeall', removeAllDiscipline);

module.exports = Router;