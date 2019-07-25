const Card = require('../models/Card');
const axios = require('axios');

function timedFetch(array, i = 0) {
  axios(array[i].prints_search_uri)
    .then(res => {
      const newColors = [...new Set([
        ...res.data.data[0].card_faces[0].colors,
        ...res.data.data[0].card_faces[1].colors
      ])];
      return Card
        .findByIdAndUpdate(array[i]._id, {
          card_faces: res.data.data[0].card_faces,
          colors: newColors
        }, { new: true })
        .catch(err => console.log(err));
    })
    .then(res => {
      //eslint-disable-next-line no-console
      console.log('updated ' + res.name, i);
      if(i < array.length - 1) {
        setTimeout(() => {
          timedFetch(array, i + 1);
        }, 150);
      } else {
        //eslint-disable-next-line no-console
        console.log('transform cards updated!');
      }
    });
    
}

function fetchTransformCards() {
  //eslint-disable-next-line no-console
  console.log('checking transform cards');
  // require('../utils/connect')();
  return Card.find({ layout: 'transform' })
    .then(cards => {
      timedFetch(cards);
    })
    //eslint-disable-next-line no-console
    .catch(err => console.log(err));
}

// fetchTransformCards();

module.exports = fetchTransformCards;
