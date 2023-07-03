// environement variables
require('dotenv').config({path: './config/.env'});
// requirements
const express = require('express');
const expressLayout = require('express-ejs-layouts');

// databse connection
const connectDB = require('./config/db');
connectDB();

// routes
const mainRoutes =  require('./server/routes/mainRoutes');

// init app
const app = express();

// template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// files serving
app.use(express.static('public'));

// middlewares
// logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

// routes
app.use('/api/main', mainRoutes);


// listen for requests
const PORT = process.env.PORT; //5000
app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});