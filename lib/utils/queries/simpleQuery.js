const textQuery = require('./textQuery');
const colorQuery = require('./colorQuery');

module.exports = simpleQuery => {
  const text = simpleQuery.split('|')[0];
  const colors = simpleQuery.split('|')[1];

  if(text && colors) {
    return {
      $and: [
        colorQuery('colors', colors, 'yes', 'yes'),
        {
          $or: [
            textQuery('name', text),
            textQuery('oracle_text', text),
            textQuery('type_line', text)
          ]
        }
      ]
    };
  } else if(text) {
    return {
      $or: [
        textQuery('name', text),
        textQuery('oracle_text', text),
        textQuery('type_line', text)
      ]
    };
  } else {
    return {
      ...colorQuery('colors', colors, 'yes', 'yes')
    };
  }
};
