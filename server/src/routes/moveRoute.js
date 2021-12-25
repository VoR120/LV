const express = require('express');
const {
    getAllMove,
    findByIdMove,
    createMove,
    updateByIdMove,
    removeMove,
    removeAllMove,
    findByTypeMove,
    findByTypeIdMove,
    findByPMId
} = require('../controllers/moveCtrller');
const Router = express.Router();

Router.get('/move', getAllMove);
Router.get('/move/getbytype', findByTypeMove);
Router.get('/move/getbypmid', findByPMId);
Router.get('/move/getbytypeid', findByTypeIdMove);
Router.get('/move/:id', findByIdMove);
Router.post('/move/create', createMove);
Router.put('/move/:id', updateByIdMove);
Router.delete('/move/:id', removeMove);
Router.delete('/move/removeall', removeAllMove);

module.exports = Router;