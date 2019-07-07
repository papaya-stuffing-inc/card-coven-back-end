module.exports = sortQuery => {
  const split = sortQuery.split(',');
  return { [split[0]]: parseInt(split[1]) };
};
