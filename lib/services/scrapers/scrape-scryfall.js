const axios = require('axios');
const fs = require('fs');

async function scryScrape(url = 'https://api.scryfall.com/cards?page=1') {
  const page = url.slice(36);
  console.log('page', page);
  const scryData = await axios.get(url);
  console.log(scryData.data);
  // const parsed = JSON.parse(scryData);
  fs.writeFileSync(`../../CardData/scryfall-page-${page}.json`, JSON.stringify(scryData.data), 'utf8');
  console.log(`writestream page ${page} complete`);
  if(scryData.data.has_more) return scryScrape(scryData.data.next_page);
  else {
    console.log('completed!');
  }
}

scryScrape();

