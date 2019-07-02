const { Router } = require('express');
const Card = require('../models/Card');
const createQueryRegExp = require('../utils/queryRegExp');

module.exports = Router()
  .get('/', (req, res, next) => {
    const query = {};
    const { page = 1, perPage = 50, name, colors, exclusivity, exclude } = req.query;

    if(name) {
      query.name = {
        $regex: new RegExp(createQueryRegExp(name), 'gi')
      };
    }
    
    if(colors && exclude === 'yes') {
      const colorsArray = colors.split(',');
      console.log('colorsArray', colorsArray);
      console.log('REQ.QUERY', req.query);
      query.colors = { $or: [['B'], ['R']] };
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
