const sortQuery = require('../../lib/utils/queries/sortQuery');

describe('sort query tests', () => {
  it('returns a sort query object', () => {
    expect(sortQuery('cmc,-1')).toEqual({ cmc: -1 });
  });
});
