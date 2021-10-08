const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

//Connect Database
const sql = require('./configs/db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(cors());

// Route
const route = require('./routes/index');
route(app);

app.listen('4000', () => {
    console.log('Server running 4000!');
})

