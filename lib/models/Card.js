const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  colorIdentity: {
    type: Array
  },
  colors: {
    type: Array
  },
  convertedManaCost: {
    type: Number
  },
  layout: {
    type: String,
  },
  legalities: {
    type: Object
  },
  manaCost: {
    type: String
  },
  mtgstocksId: {
    type: Number
  },
  name: {
    type: String
  },
  power: {
    type: String,
  },
  purchaseUrls: {
    type: Object
  },
  rulings: {
    type: Array
  },
  scryfallOracleId: {
    type: String
  },
  subTypes: {
    type: Array
  },
  superTypes: {
    type: Array
  },
  text: {
    type: String
  },
  cardType: {
    type: Array
  },
  toughness: {
    type: String,
  },
  cardTypes: {
    type: Array
  },
  uuid: {
    type: String
  }
});

module.exports = mongoose.model('Card', cardSchema);

