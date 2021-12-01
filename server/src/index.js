const express = require('express');
const env = require('dotenv');
const cors = require('cors');

env.config();

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

