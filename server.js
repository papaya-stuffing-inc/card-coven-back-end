// require('dotenv').config();
require('./lib/utils/connect')();
const initializeCardData = require('./lib/services/initialize-card-data');
const updateCardData = require('./lib/services/update-card-data');
const app = require('./lib/app');
const fs = require('fs');
const schedule = require('node-schedule');

const cardDataExists = fs.existsSync('./card-data/scryfall/card-data.json');
const PORT = process.env.PORT || 7891;

function runServer() {
  app.listen(PORT, () => {
    //eslint-disable-next-line no-console
    console.log(`You are listening to smoooth jazz on port ${PORT}`);
    //eslint-disable-next-line no-unused-vars
    const scheduleUpdate = schedule.scheduleJob('0 30 16 * * 1,4', () => {
      //eslint-disable-next-line no-console
      console.log('Updating card data');
      updateCardData();
    });
  });
}

if(!cardDataExists) {
  //eslint-disable-next-line no-console
  console.log('No card data exists. Initializing card data now...');
  initializeCardData(runServer);
} else {
  //eslint-disable-next-line no-console
  console.log('Card Data Exists');
  runServer();
}


//comment
