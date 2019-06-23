const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(require('cors')());
app.use(express.json());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));


module.exports = app;
