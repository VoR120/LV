const express = require('express');
const {
    getGenderStatistic, getPartyCellStatistic, getEthnicStatistic, getReligionStatistic, 
    getAgeStatistic, getPositionStatistic, getITStatistic, getPoliticsStatistic, getFLanguageStatistic
} = require('../controllers/statisticCtrller');
const Router = express.Router();

Router.get('/statistic/gender', getGenderStatistic);
Router.get('/statistic/partycell', getPartyCellStatistic);
Router.get('/statistic/position', getPositionStatistic);
Router.get('/statistic/ethnic', getEthnicStatistic);
Router.get('/statistic/religion', getReligionStatistic);
Router.get('/statistic/age', getAgeStatistic);
Router.get('/statistic/it', getITStatistic);
Router.get('/statistic/politics', getPoliticsStatistic);
Router.get('/statistic/flanguage', getFLanguageStatistic);

module.exports = Router;