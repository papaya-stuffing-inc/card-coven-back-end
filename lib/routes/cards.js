const { Router } = require('express');
const Card = require('../models/Card');
const textQuery = require('../utils/textQuery');
module.exports = Router()
  .get('/', (req, res, next) => {
    if(req.query) {
      var query = {
        $and: []
      };
    }
    const { 
      page = 1, 
      perPage = 50, 
      name, 
      colors, 
      exact, 
      exclude, 
      reprint
    } = req.query;

    if(name) {
      query.$and.push(textQuery('name', name));
    }
    
    return Card
      .find({ ...query, reprint: false })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .select({
        _id: true,
        multiverse_ids: true,
        colors: true,
        color_identity: true,
        name: true,
        released_at: true,
        layout: true,
        image_uris: true,
        mana_cost: true,
        cmc: true,
        type_line: true,
        oracle_text: true,
        power: true,
        toughness: true,
        legalities: true,
        set_name: true,
        set_uri: true,
        rulings_uri: true,
        rarity: true,
        artist: true,
        prices: true,
        related_uris: true,
        purchase_uris: true
      })
      .lean()
      .then(card => res.send(card));
  });
