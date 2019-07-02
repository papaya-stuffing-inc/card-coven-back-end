const createQueryRegExp = require('../../lib/utils/queryRegExp');

describe('queryRegExp function', () => {
  it('takes a string and creates a regular expression out of it', () => {
    const queryString = 'animar soul of elements';
    const regExp = createQueryRegExp(queryString);
    expect(regExp).toEqual('.*animar.*soul.*of.*elements.*');
  });
});
