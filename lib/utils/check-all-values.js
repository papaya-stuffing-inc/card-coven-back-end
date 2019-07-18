require('dotenv').config();
const mongoose = require('mongoose');
const Card = require('../models/Card');

function checkValues() {
  require('../connect')();
  return Card
    .find()
    .then(res => {
      const set = new Set();
      res.forEach(card => set.add(card.set_name));
      console.log(set);
    })
    .then(() => {
      mongoose.connection.close();
    });
    
} 

checkValues();


