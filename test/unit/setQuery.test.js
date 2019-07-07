const setQuery = require('../../lib/utils/queries/setQuery');

describe('set query tests', () => {
  it('queries for SET, SINGLE', () => {
    expect(setQuery('Khans of Tarkir')).toEqual({ set_name: 'Khans of Tarkir' });
  });
  it('queries for SET, MULTIPLE', () => {
    expect(setQuery('khans of tarkir|core 2010')).toEqual({
      $or: [
        { set_name: 'khans of tarkir' },
        { set_name: 'core 2010' }
      ]
    });
  });
});
