//REQUIRE EXPRESS
const express = require('express');
//IMPORT ROUTER
const router = express.Router();
//IMPORT DB
const db = require('../models');
//IMPORT MIDDLEWARE
const flash = require('flash');
//TODO: UPDATE REQUIRE PASSPORT CONFIG FILE PATH
const passport

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
            console.log("User created! 🙌🏼🙌🏼🙌🏼");
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
    res.render('auth/login');
})
//LOGIN POST ROUTE
//TODO: PASS NEXT param TO FUNCTION
router.post('/login', function(req, res) {
    passport.authenticate('local', function(error, user, info) {
        // IF NO USER AUTHENTICATED
        if (!user) {
            req.flash('error', 'Invalid username or password');
            // SAVE TO OUR USER SESSION NO USERNAME
            req.session.save(function() {
                return res.redirect('/auth/login');
            })
            // REDIRECT OUR USER TO TRY LOGGING IN AGAIN

        }
        if (error) {
            // ADD NEXT param FROM FUNCTION
            return next(error);
        }

        req.login(function(user, error) {
            //IF ERROR MOVE TO ERROR
            if (error) next(error);
            //IF SUCCESS FLASH SUCCESS MESSAGE
            req.flash('success', 'You are validated and logged in.')
            //IF SUCCESS SAVE SESSION AND REDIRECT USER
            req.session.save(function () {
                return res.redirect('/');
            })
        })
    })
})

router.post('/login', passport.authenticate('local', {
    //THESE NEED TO BE PATHS AND NOT VIEWS FILES
    successRedirect: '/',
    failureRedirect: '/auth/login',
    successFlash: 'Welcome to our app!',
    failureFlash: 'Invalide username or password.'
}));


//export router
module.exports = router;