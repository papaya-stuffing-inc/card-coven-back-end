const sortQuery = require('../../lib/utils/queries/sortQuery');

describe('sort query tests', () => {
  it('returns a sort query object', () => {
    expect(sortQuery('cmc,-1')).toEqual({ cmc: -1 });
  });
  it('works with multiple search queries', () => {
    expect(sortQuery('cmc,-1|prices,-1')).toEqual({
      cmc: -1,
      prices: -1
    });
  });
});
