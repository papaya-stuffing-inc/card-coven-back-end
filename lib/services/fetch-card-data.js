const axios = require('axios');
const Card = require('../models/Card');
const fetchTransformCards = require('../services/fetch-transform-cards');

function fetchCardData(
  fetchUrl = 'https://api.scryfall.com/cards/search?q=lang:en',
  count = 1
) {
  console.log('fetching cards...' + count);
  const counter = count + 1;
  axios(fetchUrl)
    .then(res => {
      return Promise.all([
        Promise.resolve(res.data.has_more),
        Promise.resolve(res.data.next_page),
        ...res.data.data.map((card, i) => {
          return Card.find({ id: card.id }).then(cardData => {
            const existingCard = cardData[0];
            if(existingCard)
              return Card.findByIdAndUpdate(existingCard._id, {
                image_uris: card.image_uris,
                legalities: card.legalities,
                prices: card.prices
              }).then(updatedCard => {
                console.log(`${i} ${updatedCard.name} updated!`);
                return Promise.resolve('ok');
              });
            else
              return Card.create(card).then(createdCard => {
                console.log(`${i} ${createdCard.name} added!`);
                return Promise.resolve('ok');
              });
          });
        })
      ]);
    })
    .then(res => {
      if(res[0] === true) {
        setTimeout(() => {
          fetchCardData(res[1], counter);
        }, 150);
      } else if(res[0] === false) {
        console.log('card fetch complete!');
        fetchTransformCards();
      }
    });
}

module.exports = fetchCardData;
