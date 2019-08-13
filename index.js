const express = require('express');
const bodyParser = require("body-parser");
const logger = require("morgan");
const Cors = require('cors');
const fs = require('fs');
const Axios = require('axios');
const mongoose = require('mongoose');
const passport = require('./lib/passport');

const app = express();
const router = express.Router();

require('dotenv').config()

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' })
const API_PORT = process.env.SERVER_PORT;

app.use(bodyParser({limit: '50mb'}));
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.checkToken);

/*
  Set mongo link in .env, get database from mlab for testing or
  install mongo on localhost
*/

app.use(logger('combined', { stream: accessLogStream }));
if(!process.env.MONGODB){
  console.log('You\'ve not set the db link in .env');
}else{
  // this is our MongoDB database
  const dbRoute = process.env.MONGODB;

  // connects our back end code with the database
  mongoose.connect(dbRoute, { useNewUrlParser: true })
    .catch(e => {
      console.log('Start your database or check the connection!')
    });
}

let db = mongoose.connection;

// Routes
require('./routes/index.js')(router);

// append /api for our http requests
app.use(process.env.URL_PATH, router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
