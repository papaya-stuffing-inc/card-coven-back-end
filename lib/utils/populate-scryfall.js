const fs = require('fs');

const rawCardData = fs.readFileSync('./card-data/scryfall-english/test.json');
const parsed = JSON.parse(rawCardData);
console.log(parsed.length);
