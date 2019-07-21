const fs = require('fs');
const axios = require('axios');
const populateCardData = require('../utils/populate-db/populate-scryfall');

function initializeCardData(callback) {
  const defaultCardsUrl = 'https://archive.scryfall.com/json/scryfall-default-cards.json';
  
  //**rulings url below for adding rulings to db**
  // const rulingsUrl = 'https://archive.scryfall.com/json/scryfall-rulings.json';
  let dataCount = 0;

  return axios({
    method: 'get',
    url: defaultCardsUrl,
    responseType: 'stream'
  })
    .then(function(response) {
      const writeStream = fs.createWriteStream('./card-data/scryfall/card-data.json');
      response.data.pipe(writeStream);
      response.data.on('data', () => {
        //eslint-disable-next-line no-console
        console.log(`data${dataCount}`);
        dataCount++;
      });
      response.data.on('close', () => {
        //eslint-disable-next-line no-console
        console.log('closed');
        populateCardData(callback);
      });
    })
    //eslint-disable-next-line no-console
    .catch(err => console.log(err));
}

module.exports = initializeCardData;

