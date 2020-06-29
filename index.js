//REQUIRED NPM LIBRARIES
//CONFIGURE dotenv
require('dotenv').config();
//REQUIRE express AND SETUP AND express app INSTANCE
const Express = require('express');
//REQUIRE AND SET view engine USE ejs
const ejsLayouts = require('express-ejs-layouts')
//SET app TO USE false urlencoding
//SET app public directory FOR USE
//SET app ejs layouts FOR RENDER


//APP SETUP
const app = Express();
app.use(Express.urlencoded({ extended: false }));
app.use(Express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);


//ROUTES
app.get('/', function(req, res) {
//CHECK TO SEE IF USER LOGGED IN
    res.render('index');
})

//INITIALIZE app ON PORT
app.listen(process.env.PORT || 3000, function() {
    console.log(`Listening to the smooth sweet sounds of port ${process.env.PORT} in the morning ☕️☕️☕️`)
});