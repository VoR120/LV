const express = require('express');
const Router = express.Router();

const { getAllAchievement, createAchievement, findByIdAchievement, updateByIdAchievement, removeAchievement } = require('../controllers/achievementCtrller');

Router.get('/achievement', getAllAchievement);
Router.get('/achievement/:id', findByIdAchievement);
Router.post('/achievement/create', createAchievement);
Router.put('/achievement/:id', updateByIdAchievement);
Router.delete('/achievement/:id', removeAchievement);

module.exports = Router;