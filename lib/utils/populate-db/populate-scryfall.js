const fs = require('fs');
const Card = require('../../models/Card');
const fetchTransformCards = require('../../services/fetch-transform-cards');

function populateCardData(callback) {
  const rawCardData = fs.readFileSync('./card-data.json');
  const parsed = JSON.parse(rawCardData);

  Card.insertMany(parsed)  
    .then(() => {
      fetchTransformCards(callback);
    });
}

module.exports = populateCardData;
