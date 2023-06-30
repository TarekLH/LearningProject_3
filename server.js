// environement variables
require('dotenv').config({path: './config/.env'});
// requirements
const express = require('express');
const expressLayout = require('express-ejs-layouts');

// init app
const app = express();

// template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// files serving
app.use(express.static('public'));

// routes
app.use('/', require('./server/routes/main'));


// listen for requests
const PORT = process.env.PORT; //5000
app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});