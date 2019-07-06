const colorQuery = require('../../lib/utils/queries/colorQuery');

describe('create color query tests', () => {
  it('queries a single color with no modifiers', () => {
    expect(colorQuery('colors', 'B', 'no', 'no')).toEqual({
      colors: 'B'
    });
  });
  it('queries multiple colors with no modifiers', () => {
    expect(colorQuery('colors', 'B,R', 'no', 'no')).toEqual({
      $or: [
        { colors: 'B' },
        { colors: 'R' }
      ]
    });
  });
  it('queries a single color with exact matching', () => {
    expect(colorQuery('colors', 'B', 'yes', 'no')).toEqual({
      colors: 'B'
    });
  });
  it('queries multiple colors with exact matching', () => {
    expect(colorQuery('colors', 'B,R', 'yes', 'no')).toEqual({
      colors: { $all: ['B', 'R'] }
    });
  });
  it('queries a single color with exclude unselected', () => {
    expect(colorQuery('colors', 'B', 'no', 'yes')).toEqual({
      colors: ['B']
    });
  });
  it('queries multiple colors with exclude unselected', () => {
    expect(colorQuery('colors', 'B,R', 'no', 'yes')).toEqual({
      $and: [
        { colors: { $nin: ['G', 'W', 'U'] } },
        { colors: 'B' },
        { colors: 'R' }
      ]
    });
  });
  it('queries a single color with exact exclude', () => {
    expect(colorQuery('colors', 'B', 'yes', 'yes')).toEqual({
      colors: ['B']
    });
  });
  it('queries multiple colors with exact exclude', () => {
    expect(colorQuery('colors', 'B,R', 'yes', 'yes')).toEqual({
      $and: [
        { colors: { $nin: ['G', 'W', 'U'] } },
        { colors: { $all: ['B', 'R'] } }
      ]
    });
  });
});
