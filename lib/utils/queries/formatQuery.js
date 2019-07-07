module.exports = formats => {
  const formatsArray = formats.split(',');
  if(formatsArray.length === 1) return { [`legalities.${formats}`]: 'legal' };
  else {
    const query = { $or: [] };
    formatsArray.forEach(format => query.$or.push({ [`legalities.${format}`]: 'legal' }));
    return query;
  }
};
