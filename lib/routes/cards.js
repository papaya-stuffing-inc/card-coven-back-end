const { Router } = require('express');
const Card = require('../models/Card');
const textQuery = require('../utils/queries/textQuery');
const colorQuery = require('../utils/queries/colorQuery');
const formatQuery = require('../utils/queries/formatQuery');
const setQuery = require('../utils/queries/setQuery');
const sortQuery = require('../utils/queries/sortQuery');
const util = require('util');
module.exports = Router()
  .get('/', (req, res, next) => {
    let query = {
      $and: [
        { lang: 'en' },
        { $or: [
          { layout: 'normal' },
          { layout: 'leveler' },
          { layout: 'split' },
          { layout: 'flip' },
          { layout: 'transform' },
          { layout: 'saga' },
          { layout: 'meld' }
        ] },
      ]
    };
    let sortOptions = {};

    const { 
      page = 1, 
      perPage = 50, 
      name, 
      colors,
      color_identity, 
      exact, 
      exclude, 
      type_line,
      oracle_text,
      formats,
      sets,
      layout,
      sort,
      reprinted_allowed
    } = req.query;

    name && query.$and.push(textQuery('name', name));
    colors && query.$and.push(colorQuery('colors', colors, exact, exclude));
    color_identity && query.$and.push(colorQuery('color_identity', color_identity, exact, exclude));
    type_line && query.$and.push(textQuery('type_line', type_line));
    oracle_text && query.$and.push(textQuery('oracle_text', oracle_text));
    formats && query.$and.push(formatQuery(formats));
    sets && query.$and.push(setQuery(sets));
    if(layout) query.$and[2] = { layout };
    reprinted_allowed && query.$and.splice(0, 1);
    if(sort) sortOptions = sortQuery(sort);
    
    console.log(util.inspect(query, { showHidden: false, depth: null })); 
    // console.log(util.inspect(textQuery('name', name), { showHidden: false, depth: null })); 
    return Promise.all([
      Card.countDocuments({ ...query }),
      Card
        .find({ ...query })
        .sort(sortOptions)
        .skip(perPage * (page - 1))
        .limit(perPage)
        .select({
          _id: true,
          multiverse_ids: true,
          colors: true,
          id: true,
          oracle_id: true,
          color_identity: true,
          name: true,
          released_at: true,
          layout: true,
          image_uris: true,
          mana_cost: true,
          cmc: true,
          type_line: true,  
          oracle_text: true,
          card_faces: true,
          power: true,
          reprint: true,
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
    ])
      .then(([count, results]) => res.send({
        totalCount: count,
        perPage,
        page,
        hasResults: results.length > 0,
        displaying: results.length > 0 ? `${(page - 1) * perPage + 1 }-${(page - 1) * perPage + results.length}` : 'N/A',
        totalPages: Math.ceil(count / perPage),
        hasMore: page < Math.ceil(count / perPage),
        hasLess: page > 1,
        results
      }))
      .catch(next);
  });
