//REQUIRE EXPRESS
const express = require('express');
//IMPORT ROUTER
const router = express.Router();
//IMPORT DB
const db = require('../models');
//IMPORT MIDDLEWARE
const flash = require('flash');


//REGISTER GET ROUTE
router.get('/register', function(req, res) {
    res.render('auth/register');
})
//REGISTER POST ROUTE
router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, 
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function([user, created]) {
        // IF USER WAS CREATED
        if (created) {
            // AUTHENTICATE USER AND START AUTHORIZATION PROCESS
            consolele.log("User created! 🙌🏼🙌🏼🙌🏼");
            res.redirect('/');
            // ELSE IF USER ALREADY EXISTS
        } else {
            console.log('User email already exists 🚫🚫🚫🚫🚫🚫');
            req.flash('error', 'Error: email already exists for user. Try again.');
            res.redirect('/auth/register');
        }
    }).catch(function(err) {
        console.log('Error found 🔥🔥🔥🔥🔥\nPlease review' + err.message)
        console.log(err);
        // SEND ERROR USER THAT EMAIL ALREADY EXISTS
            req.flash('error', err.message);
            // REDIRECT BACK TO REGISTER GET ROUTE 
        res.redirect('/auth/register');
    })
})

//LOGIN GET ROUTE
router.get('/login', function(req, res) {
    res.render('auth/register');
})
//LOGIN POST ROUTE

//export router
module.exports = router;