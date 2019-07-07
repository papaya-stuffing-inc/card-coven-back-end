require('dotenv').config();
const mongoose = require('mongoose');
const Card = require('../../models/Card');
require('../connect')();


Card
  .find()
  .then()

mongoose.connection.close();

