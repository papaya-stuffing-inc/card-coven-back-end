const dotenv = require('dotenv').config();
const Card = require('../models/Card');
const axios = require('axios');

function fetchTransformCards(callback) {
  console.log('checking transform cards');
  return Card.find({ layout: 'transform' })
    .then(cards => {
      let i = -1;
      //eslint-disable-next-line no-unused-vars
      const requestInterval = setInterval(() => {
        i++;
        if(i < cards.length) {
          axios(cards[i].prints_search_uri)
            .then(res => {
              const newColors = new Set();
              res.data.data[0].card_faces[0].colors.forEach(color => {
                newColors.add(color);
              });
              res.data.data[1].card_faces[0].colors.forEach(color => {
                newColors.add(color);
              });
              return Card
                .findByIdAndUpdate(cards[i]._id, {
                  card_faces: res.data.data[0].card_faces,
                  colors: newColors
                }, { new: true })
                .catch(err => console.log(err));
            })
            .then(res => console.log('updated ' + res.name, i));
          
        } else {
          clearInterval(requestInterval);
          console.log('all transform cards updated');
          callback();
        }
      }, 250);
    })
    .catch(err => console.log(err));
}

module.exports = fetchTransformCards;
