const express = require('express');
const path = require('path');
const itemsRouter = require('./routes/items');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/items', itemsRouter);

module.exports = app;
