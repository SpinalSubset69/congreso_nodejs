const express = require('express');
const app = express();
require('./Database/index');
const routes = require('./Routes/index');
const CORS = require('cors');
const path = require('path');

app.use(CORS());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

module.exports = app;