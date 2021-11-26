const express = require('express');
const { createPoll, getVoting, getAllVoting } = require('../controllers/votingCtrller');
const Router = express.Router();

Router.get('/voting', getAllVoting);
Router.get('/voting/:id', getVoting);
Router.post('/voting/create', createPoll);

module.exports = Router;