const axios = require('axios');
const fs = require('fs');

function scryScrape(url = 'https://api.scryfall.com/cards?page=1') {
  const page = url[url.length - 1];
  return axios({
    method: 'get',
    url: url,
    responseType: 'stream'
  })
    .then(res => {
      return Promise.all([
        Promise.resolve(res.json()),
        res.data.pipe(fs.createWriteStream(`./CardData/scryfall-page-${page}.json`, 'utf8'))
      ]);
    })
    .then(res => {
      console.log(`writestream page ${page} complete`);
      if(res[0].has_more) return scryScrape(res[0].next_page);
    })
    .then(() => console.log('IT FUCKING WORKED'));
}
