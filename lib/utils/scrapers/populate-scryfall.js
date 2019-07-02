require('dotenv').config();
const fs = require('fs');
const Card = require('../../models/Card');
const mongoose = require('mongoose');

const rawCardData = fs.readFileSync('./card-data/scryfall-english/test.json');
const parsed = JSON.parse(rawCardData);

require('../connect')();

// // Card.createCollection(cardData);
Card.insertMany(parsed)  
  .then(() => mongoose.connection.close());
console.log('complete!');
