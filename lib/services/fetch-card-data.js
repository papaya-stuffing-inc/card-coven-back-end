const fs = require('fs');
const axios = require('axios');
const mongoose = require('mongoose');
const repopulateCardData = require('./scrapers/populate-scryfall');

function updateCardData() {
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
      const writeStream = fs.createWriteStream('./card-data/scryfall/card-data.json')
      response.data.pipe(writeStream);
      response.data.on('data', () => {
        console.log(`data${dataCount}`);
        dataCount++;
      })
      response.data.on('close', () => {
        console.log('closed');
        repopulateCardData();
      });
    })
    .catch(err => console.log(err));
}

updateCardData();
