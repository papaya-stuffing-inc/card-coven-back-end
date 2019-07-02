const createColorQuery = require('../../lib/utils/colorQuery');

describe('create color query tests', () => {
  it('it creates a query object for OR EXCLUDE', () => {
    const colors = ['B', 'W', 'R'];
    const exclude = 'yes';
    const exclusivity = 'or';
    const field = 'colors';
  
    expect(createColorQuery(colors, exclusivity, exclude, field)).toEqual({
      $or: 
        [
          { colors: ['B'] },
          { colors: ['W'] },
          { colors: ['R'] },
        ]
    });
  });
  it('it creates a query object for AND EXCLUDE', () => {
    const colors = ['B', 'W', 'R'];
    const exclude = 'yes';
    const exclusivity = 'and';
    const field = 'colors';
  
    expect(createColorQuery(colors, exclusivity, exclude, field)).toEqual({
      $or: 
        [
          { colors: ['B', 'W'] },
          { colors: ['B', 'R'] },
          { colors: ['W', 'R'] },
          { colors: ['B', 'W', 'R'] }
        ]
    });
  });
});
