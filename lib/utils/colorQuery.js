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
  } else if(exact === 'no' && exclude === 'yes') {
    if(colors.length === 1) return { [field]: colorArray };
    else {
      const allColors = ['G', 'R', 'W', 'U', 'B'];
      const unselectedColors = [];
      allColors.forEach(color => {
        !colorArray.includes(color) && unselectedColors.push(color);
      });
      const query = { $and: [{ [field]: { $nin: unselectedColors } }] };
      colorArray.forEach(color => query.$and.push({ [field]: color }));
      return query;
    }
  }
}

module.exports = colorQuery;
