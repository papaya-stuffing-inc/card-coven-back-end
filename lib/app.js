const express = require('express');
const mongoConnection = require('./middleware/mongoConnection');

const app = express();

app.use(require('cors')());
app.use(express.json());

app.use('/api/v1/cards', mongoConnection, require('./routes/cards'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));


module.exports = app;
