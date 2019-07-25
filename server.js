// require('dotenv').config();
require('./lib/utils/connect')();
const Card = require('./lib/models/Card');
const fetchCardData = require('./lib/services/fetch-card-data');
const fetchTransformCards = require('./lib/services/fetch-card-data');
const mongoose = require('mongoose');
const app = require('./lib/app');
const schedule = require('node-schedule');

const PORT = process.env.PORT || 7891;


app.listen(PORT, () => {
  //eslint-disable-next-line no-console
  console.log(`You are listening to smoooth jazz on port ${PORT}`);
  Card.find()
    .then(res => {
      if(res.length === 0) {
        //eslint-disable-next-line no-console
        console.log('Card data does not exist, fetching card data now...')
        fetchCardData(); 
      }
    });
    
  //eslint-disable-next-line no-unused-vars
  const scheduleUpdate = schedule.scheduleJob('0 30 16 * * 1,4', () => {
    //eslint-disable-next-line no-console
    console.log('Updating card data');
    mongoose.connection.dropCollection('cards');
    fetchCardData();
    fetchTransformCards();
  });
});



