function createColorQuery(colors, exclusivity, exclude, field) {
  if(exclude === 'yes' && exclusivity === 'or') {
    const query = { $or: [] };
    for(let i = 0; i < colors.length; i++) {
      query.$or.push({ [field]: [colors[i]] });
    }
    return query;
  }
}

module.exports = createColorQuery;
