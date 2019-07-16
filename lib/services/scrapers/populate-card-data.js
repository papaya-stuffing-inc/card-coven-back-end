require('dotenv').config();
const Card = require('../../models/Card');
const fs = require('fs');
const mongoose = require('mongoose');

const rawCardData = fs.readFileSync('./CardData/AllCards.json', 'utf8');
const cardData = Object.values(JSON.parse(rawCardData));
const trimmedCardData = cardData.map(card => {
  const {
    colorIdentity, 
    colors,
    convertedManaCost,
    layout,
    legalities,
    manaCost,
    mtgstocksId,
    name,
    power,
    purchaseUrls,
    rulings,
    scryfallOracleId,
    subTypes,
    superTypes,
    text,
    type,
    types,
    toughness,
    uuid
  } = card;

  return {
    colorIdentity, 
    colors,
    convertedManaCost,
    layout,
    legalities,
    manaCost,
    mtgstocksId,
    name,
    power,
    purchaseUrls,
    rulings,
    scryfallOracleId,
    subTypes,
    superTypes,
    text,
    cardType: type,
    cardTypes: types,
    toughness,
    uuid
  };
});

require('../../utils/connect')();

// // Card.createCollection(cardData);
Card.insertMany(trimmedCardData)  
  .then(() => mongoose.connection.close());
// cardData.map(card => {
//   Card.create(card);
// });



