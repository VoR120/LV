const express = require('express');
const { createPoll, updatePoll, createVoting, checkIsVoted, getResult, removePoll, getAllPoll, getPoll } = require('../controllers/votingCtrller');
const Router = express.Router();

Router.get('/voting', getAllPoll);
Router.get('/voting/:id', getPoll);
Router.post('/voting/create', createPoll);
Router.put('/voting/:id', updatePoll);
Router.delete('/voting/:id', removePoll);

Router.get('/voting/getResult/:id', getResult);

Router.post('/voting/check', checkIsVoted);
Router.post('/voting/createvoting', createVoting);

module.exports = Router;