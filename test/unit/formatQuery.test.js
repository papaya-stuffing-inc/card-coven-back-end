const formatQuery = require('../../lib/utils/queries/formatQuery');

describe('format query tests', () => {
  it('formats a query for a single format', () => {
    expect(formatQuery('standard')).toEqual(
        { 'legalities.standard': 'legal' });
  });
  it('formats a query for multiple formats', () => {
    expect(formatQuery('standard,edh')).toEqual({
      $or: [
        { 'legalities.standard': 'legal' },
        { 'legalities.edh': 'legal' }
      ]
    });
  });
});
