const router = require('express').Router();
const { User, Job } = require('../models');
const withAuth = require('../utils/auth');


// Jobs route to find all jobs
router.get('/', async (req, res) => {
    try {
      // Get all job and JOIN with user data
      const jobData = await Job.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const jobs = jobData.map((jobs) => jobs.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('dashboard', { 
        jobs, 
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


  // Login page route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route (profile)
    if (req.session.logged_in) {

       res.redirect('/profile');
       return;
    }

    res.render('login');
});

module.exports = router;