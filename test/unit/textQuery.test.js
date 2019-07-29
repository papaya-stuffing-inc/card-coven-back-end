const textQuery = require('../../lib/utils/queries/textQuery');

describe('tests text query function', () => {
  it('returns a query for regex', () => {
    expect(textQuery('name', 'Animar')).toEqual(
      { name: { $regex: /.*Animar.*/gi } }
    );
  });
});
