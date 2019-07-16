const fs = require('fs');
const axios = require('axios');
const mongoose = require('mongoose');

function updateCardData() {
  const defaultCardsUrl = 'https://archive.scryfall.com/json/scryfall-default-cards.json';
  const rulingsUrl = 'https://archive.scryfall.com/json/scryfall-rulings.json';

  return axios({
    method: 'get',
    url: defaultCardsUrl,
    responseType: 'stream'
  })
    .then(function(response) {
      const writeStream = fs.createWriteStream('./card-data/scryfall/card-data.json')
      response.data.pipe(writeStream);
      response.data.on('close', () => {
        
      });
    })
    .catch(err => console.log(err));

}

updateCardData();
