const fs = require('fs');
let allCardData = [];

for(let i = 0; i < 1439; i++) {
  const pageData = fs.readFileSync(`./card-data/scryfall/scryfall-page-${i}.json`, 'utf8');
  const parsed = JSON.parse(pageData);
  console.log('PRE-FILTER', parsed.data.length);
  allCardData = [...allCardData, ...parsed.data.filter(card => card.lang === 'en')];
  console.log('POST_FILTER', allCardData.length);
  
}
console.log('PRE-WRITE', allCardData.length);
fs.writeFileSync('./card-data/scryfall-english/test.js', JSON.stringify(allCardData), 'utf8');
