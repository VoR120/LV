const express = require('express');
const {
    getAllPositionPM,
    findByIdPositionPM,
    createPositionPM,
    updateByIdPositionPM,
    removePositionPM,
    removeAllPositionPM
} = require('../controllers/positionPMCtrller');
const Router = express.Router();

Router.get('/positionpm', getAllPositionPM);
Router.get('/positionpm/:id', findByIdPositionPM);
Router.post('/positionpm/create', createPositionPM);
Router.put('/positionpm/:id', updateByIdPositionPM);
Router.delete('/positionpm/:id', removePositionPM);
Router.delete('/positionpm/removeall', removeAllPositionPM);

module.exports = Router;