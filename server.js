require('dotenv').config();
require('./lib/utils/connect')();
const initializeCardData = require('./lib/services/initialize-card-data');
const app = require('./lib/app');
const fs = require('fs');

const cardDataExists = fs.existsSync('./card-data/scryfall/card-data.json');

if(!cardDataExists) {
  //eslint-disable-next-line no-console
  console.log('No card data exists. Initializing card data now...');
  initializeCardData();
}


const PORT = process.env.PORT || 7891;
app.listen(PORT, () => {
//eslint-disable-next-line no-console
  console.log(`You are listening to smoooth jazz on port ${PORT}`);
});
