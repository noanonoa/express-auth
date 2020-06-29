//REQUIRED NPM LIBRARIES
//CONFIGURE dotenv
require('dotenv').config();
//REQUIRE express AND SETUP AND express app INSTANCE
const Express = require('express');
//REQUIRE AND SET view engine USE ejs
const ejsLayouts = require('express-ejs-layouts');
//REQUIRE ALL MIDDLEWARE FOR APP/AUTHENTICATION
// helmet, morgan, passport, AND CUSTOM MIDDLEWARE, express-sessions, sequelize sessions, flash
const helmet = require('helmet');
const session = require('express-session');
const flash = require('flash');


//APP SETUP
const app = Express();
//SET app TO USE false urlencoding
app.use(Express.urlencoded({ extended: false }));
//SET app public directory FOR USE
app.use(Express.static(__dirname + '/public'));
//SET app ejs layouts FOR RENDER
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());



//ROUTES
app.get('/', function(req, res) {
//CHECK TO SEE IF USER LOGGED IN
    res.render('index');
})

//INCLUDE AUTH CONTROLLER
app.use('/auth', require('./controllers/auth'));



//INITIALIZE app ON PORT
app.listen(process.env.PORT || 3000, function() {
    console.log(`Listening to the smooth sweet sounds of port ${process.env.PORT} in the morning ☕️☕️☕️`)
});