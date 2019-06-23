const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  colorIdentity: {
    type: Array,
    required: true
  },
  colors: {
    type: Array,
    required: true
  },
  convertedManaCost: {
    type: Number,
    required: true
  },
  layout: {
    type: String,
  },
  legalities: {
    type: Object,
    required: true
  },
  manaCost: {
    type: String,
    required: true
  },
  mtgstocksId: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  power: {
    type: String,
    required: true
  },
  purchaseUrls: {
    type: Object
  },
  rulings: {
    type: Array
  },
  scryfallOracleId: {
    type: String,
    required: true
  },
  subTypes: {
    type: Array,
    required: true
  },
  superTypes: {
    type: Array,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  cardType: {
    type: Array
  },
  toughness: {
    type: String,
    required: true
  },
  cardTypes: {
    type: Array
  },
  uuid: {
    type: String
  }
});

module.exports = mongoose.model('Card', cardSchema);

