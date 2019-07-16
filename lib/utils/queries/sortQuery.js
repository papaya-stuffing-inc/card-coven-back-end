module.exports = sortQuery => {
  const sortObj = {};
  const sortQueries = sortQuery.split('|');
  sortQueries.forEach(query => {
    const splitQuery = query.split(',');
    sortObj[splitQuery[0]] = parseInt(splitQuery[1]);
  });
  
  return sortObj;
};
