function colorQuery(field, colors, exact, exclude) {
  const colorArray = colors.split(',');
  if(exact === 'no' && exclude === 'no') {
    if(colors.length === 1) return { [field]: colors[0] };
    else {
      const query = { $or: [] };
      colorArray.forEach(color => query.$or.push({ [field]: color }));
      return query;
    }
  } else if(exact === 'yes' && exclude === 'no') {
    if(colors.length === 1) return { [field]: colors[0] };
    else {
      return { [field]: { $all: [...colorArray] } }; 
    }
  } 
}

module.exports = colorQuery;
