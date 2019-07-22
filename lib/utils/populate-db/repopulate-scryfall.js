const fs = require('fs');
const Card = require('../../models/Card');
const mongoose = require('mongoose');
const fetchTransformCards = require('../../services/fetch-transform-cards');

function repopulateCardData() {
  const rawCardData = fs.readFileSync('./card-data/scryfall/card-data.json');
  const parsed = JSON.parse(rawCardData);

  mongoose.connection.dropCollection('cards');
  
  Card.insertMany(parsed)  
    .then(() => {
      console.log('database updated!');
      fetchTransformCards();
    });
}

module.exports = repopulateCardData;
