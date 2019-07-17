require('dotenv').config();
const fs = require('fs');
const Card = require('../../models/Card');
const mongoose = require('mongoose');

function repopulateCardData() {
  const rawCardData = fs.readFileSync('./card-data/scryfall/card-data.json');
  const parsed = JSON.parse(rawCardData);

  require('../../utils/connect')();

  mongoose.connection.dropCollection('cards');

  Card.insertMany(parsed)  
    .then(() => {
      mongoose.connection.close();
      console.log('database updated!');
    });
}

module.exports = repopulateCardData;
