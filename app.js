const express = require('express');
const app = express();
require('./Database/index');
const routes = require('./Routes/index');
const CORS = require('cors');

app.use(CORS());
app.use(express.json());


app.use('/api', routes);

module.exports = app;