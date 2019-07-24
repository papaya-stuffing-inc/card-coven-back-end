const Card = require('../models/Card');
const axios = require('axios');

function fetchTransformCards(callback) {
  //eslint-disable-next-line no-console
  console.log('checking transform cards');
  // require('../utils/connect')();
  return Card.find({ layout: 'transform' })
    .then(cards => {
      let i = -1;
      //eslint-disable-next-line no-unused-vars
      const requestInterval = setInterval(() => {
        i++;
        if(i < cards.length) {
          axios(cards[i].prints_search_uri)
            .then(res => {
              const newColors = [...new Set([
                ...res.data.data[0].card_faces[0].colors,
                ...res.data.data[0].card_faces[1].colors
              ])];
              return Card
                .findByIdAndUpdate(cards[i]._id, {
                  card_faces: res.data.data[0].card_faces,
                  colors: newColors
                }, { new: true })
                .catch(err => console.log(err));
            })
            //eslint-disable-next-line no-console
            .then(res => console.log('updated ' + res.name, i));
            
        } else {
          clearInterval(requestInterval);
          //eslint-disable-next-line no-console
          console.log('all transform cards updated');
          if(callback) callback();
        }
      }, 250);
    })
    //eslint-disable-next-line no-console
    .catch(err => console.log(err));
}

// fetchTransformCards();

module.exports = fetchTransformCards;
