module.exports = set_name => {
  const setArray = set_name
    .split('|')
    .map(set => ({ set_name: set }));
  if(setArray.length === 1) return setArray[0];
  else {
    return { $or: setArray };
  }
};
