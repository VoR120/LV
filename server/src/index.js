const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const path = require('path');


env.config();

//Connect Database
const sql = require('./configs/db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(cors());

// Cron
// var job = new CronJob('* * * * * *', function() {
//   console.log('You will see this message every second');
// }, null, true, 'America/Los_Angeles');
// job.start()

// Route
const route = require('./routes/index');

route(app);

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 5001, function(){
  console.log("Success")
  // console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

