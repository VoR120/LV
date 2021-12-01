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
Router.get('/move/:id', findByIdMove);
Router.get('/move/getbytypeid/:id', findByTypeIdMove);
Router.get('/move/getbypmid/:id', findByPMId);
Router.post('/move/getbytype', findByTypeMove);
Router.post('/move/create', createMove);
Router.put('/move/:id', updateByIdMove);
Router.delete('/move/:id', removeMove);
Router.delete('/move/removeall', removeAllMove);

module.exports = Router;