module.exports = formats => {
  const formatsArray = formats.split(',');
  const query = { $or: [] };
  formatsArray.forEach(format => query.$or.push({ [`legalities.${format}`]: 'legal' }));
  return query;
};
