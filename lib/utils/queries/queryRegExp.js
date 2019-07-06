module.exports = function createQueryRegExp(queryString) {
  const splitString = queryString.split(' ');
  let regExp = '.*';
  for(let i = 0; i < splitString.length; i ++) {
    regExp += `${splitString[i]}.*`;
  }
  return regExp;
};


