const express = require('express');
const Router = express.Router();

Router.get('/login', () => {console.log("Login")});

module.exports = Router;