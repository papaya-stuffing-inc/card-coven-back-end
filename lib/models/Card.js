const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  object: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  oracle_id: {
    type: String,
    required: true
  },
  multiverse_ids: {
    type: Array,
  },
  name: {
    type: String,
    required: true
  },
  printed_name: {
    type: String
  },
  lang: {
    type: String
  },
  released_at: {
    type: String
  },
  uri: {
    type: String,
  },
  scryfall_uri: {
    type: String
  },
  layout: {
    type: String
  },
  scryfallOracleId: {
    type: String
  },
  highres_image: {
    type: Boolean
  },
  image_uris: {
    small: {
      type: String
    },
    normal: {
      type: String
    },
    png: {
      type: String
    },
    art_crop: {
      type: String
    },
    border_crop: {
      type: String
    }
  },
  mana_cost: {
    type: String
  },
  cmc: {
    type: Number
  },
  type_line: {
    type: String,
  },
  printed_type_line: {
    type: String
  },
  oracle_text: {
    type: String
  },
  printed_text: {
    type: String
  },
  colors: {
    type: Array
  },
  color_identity: {
    type: Array
  },
  legalities: {
    type: Object
  },
  games: {
    type: Array
  },
  reserved: {
    type: Boolean
  },
  foil: {
    type: Boolean
  },
  nonfoil: {
    type: Boolean
  },
  oversized: {
    type: Boolean
  },
  promo: {
    type: Boolean
  },
  reprint: {
    type: Boolean
  },
  variation: {
    type: Boolean
  },
  set: {
    type: String
  },
  set_name: {
    type: String
  },
  set_type: {
    type: String
  },
  set_uri: {
    type: String
  },
  set_search_uri: {
    type: String
  },
  scryfall_set_uri: {
    type: String
  },
  rulings_uri: {
    type: String
  },
  prints_search_uri: {
    type: String
  },
  collector_number: {
    type: String
  },
  digital: {
    type: Boolean
  },
  power: {
    type: String
  },
  toughness: {
    type: String
  },
  rarity: {
    type: String
  },
  flavor_text: {
    type: String
  },
  illustration_id: {
    type: String
  },
  card_back_id: {
    type: String
  },
  artist: {
    type: String
  },
  border_color: {
    type: String
  },
  frame: {
    type: String
  },
  full_art: {
    type: Boolean
  },
  textless: {
    type: Boolean
  },
  booster: {
    type: Boolean
  },
  story_spotlight: {
    type: Boolean
  },
  edhrec_rank: {
    type: Number
  },
  prices: {
    type: Object
  },
  related_uris: {
    type: Object
  },
  purchase_uris: {
    type: Object
  },
  card_faces: {
    type: Array
  }
});

module.exports = mongoose.model('Card', cardSchema);
