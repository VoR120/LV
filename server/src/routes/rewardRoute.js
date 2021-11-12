const express = require('express');
const {
    getAllReward,
    findByIdReward,
    createReward,
    updateByIdReward,
    removeReward,
    removeAllReward,
    findByTypeIdReward
} = require('../controllers/rewardCtrller');
const Router = express.Router();

Router.get('/reward', getAllReward);
Router.get('/reward/:id', findByIdReward);
Router.get('/reward/getbytypeid/:id', findByTypeIdReward);
Router.post('/reward/create', createReward);
Router.put('/reward/:id', updateByIdReward);
Router.delete('/reward/:id', removeReward);
Router.delete('/reward/removeall', removeAllReward);

module.exports = Router;