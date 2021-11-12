const express = require('express');
const { getAllGradepM, findByIdGradepM, createGradepM, updateByIdGradepM, removeGradepM, removeAllGradepM, getYearGradepM, findByYearGradepM } = require('../controllers/gradepMCtrller');
const Router = express.Router();

Router.get('/gradepM/', getAllGradepM);
Router.get('/gradepM/getyear', getYearGradepM);
Router.get('/gradepM/getbyyear/:year', findByYearGradepM);
Router.get('/gradepM/:id', findByIdGradepM);
Router.post('/gradepM/create', createGradepM);
Router.put('/gradepM/:id', updateByIdGradepM);
Router.delete('/gradepM/:id', removeGradepM);
Router.delete('/gradepM/removeall', removeAllGradepM);

module.exports = Router;