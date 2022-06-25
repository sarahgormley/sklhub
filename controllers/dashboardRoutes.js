const router = require('express').Router();
const { User, Job } = require('../models');
const withAuth = require('../utils/auth');

  // Login page route
router.get('/signin', (req, res) => {
    // If the user is already logged in, redirect the request to another route (profile)
    if (req.session.logged_in) {

       res.redirect('/dashboard');
       return;
    }

    res.render('signin');
});

module.exports = router;