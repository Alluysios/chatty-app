const express = require('express');
const app = express();

const chatRouter = require('./router/chatRouter');

app.use('/', chatRouter);

module.exports = app;