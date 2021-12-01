const express = require('express');
const { createPoll, getVoting, getAllVoting, updatePoll, createVoting, checkIsVoted, getResult, removePoll } = require('../controllers/votingCtrller');
const Router = express.Router();

Router.get('/voting', getAllVoting);
Router.get('/voting/:id', getVoting);
Router.get('/voting/getResult/:id', getResult);
Router.post('/voting/create', createPoll);
Router.put('/voting/:id', updatePoll);
Router.delete('/voting/:id', removePoll);

Router.post('/voting/check', checkIsVoted);
Router.post('/voting/createvoting', createVoting);

module.exports = Router;