const express = require('express');
const { createPoll, updatePoll, createVoting, checkIsVoted, getResult, removePoll, getAllPoll, getPoll, getPollByTime, getVotes, getNoVoting, mailing, updateSaveResult } = require('../controllers/votingCtrller');
const Router = express.Router();

Router.get('/voting', getAllPoll);
Router.get('/voting/:id', getPoll);
Router.get('/voting/getvotes/:id', getVotes);
Router.get('/voting/getnovoting/:id', getNoVoting);
Router.post('/voting/getbytime', getPollByTime);
Router.post('/voting/create', createPoll);
Router.put('/voting/:id', updatePoll);
Router.delete('/voting/:id', removePoll);

Router.get('/voting/getresult/:id', getResult);
Router.post('/voting/saveresult/:id', updateSaveResult);
Router.post('/voting/mailing', mailing);

Router.post('/voting/check', checkIsVoted);
Router.post('/voting/createvoting', createVoting);

module.exports = Router;