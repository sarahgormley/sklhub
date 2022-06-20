const router = require('express').Router();
const { User, Job } = require('../models');
const withAuth = require('../utils/auth');

// Route for all user and protecting by withAuth method
router.get('/', withAuth, async (req,res) => {
    try {
         // Get all jobs and JOIN with user data
        const userData = await User.findAll({ 
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const users = userData.map((project) => project.get({ palin: true }));

        // Pass serialized data and session flag into template
        res.render('hompage', {
            users,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }    
});

router.get('/signin', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('signin');
  });
  
  router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('signup');
  });

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route (profile)
    if (req.session.logged_in) {

       res.redirect('/profile');
       return;
    }

    res.render('login');
});

module.exports = router;