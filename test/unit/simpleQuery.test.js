const simpleQuery = require('../../lib/utils/queries/simpleQuery');
// const util = require('util');

describe('simple query tests', () => {
  it('returns a query object', () => {
    // console.log(util.inspect(simpleQuery('destroy|B,W'), { showHidden: false, depth: null })); 
    expect(simpleQuery('destroy|B,W')).toEqual({
      $and: [
        {
          $and: [
            { colors: { $nin: ['G', 'R', 'U'] } },
            { colors: { $all: ['B', 'W'] } }
          ]
        },
        { $or: [
          { name: { $regex: /.*destroy.*/gi } },
          { oracle_text: { $regex: /.*destroy.*/gi } },
          { type_line: { $regex: /.*destroy.*/gi } }
        ] }
      ]
    });
  });
});
