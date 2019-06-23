require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');

const PORT = process.env.PORT || 7891;

app.listen(PORT, () => {
//eslint-disable-next-line no-console
  console.log(`You are listening to smoooth jazz on port ${PORT}`);
});
