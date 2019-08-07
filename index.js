const express = require('express');
const bodyParser = require("body-parser");
const logger = require("morgan");
const Cors = require('cors');
const fs = require('fs');
const Axios = require('axios');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

require('dotenv').config()

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' })
const API_PORT = '1337';

app.use(bodyParser({limit: '50mb'}));
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('combined', { stream: accessLogStream }));

// this is our MongoDB database
const dbRoute = ;

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

// Routes
require('./routes/index.js')(router);


// append /api for our http requests
app.use("/", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
