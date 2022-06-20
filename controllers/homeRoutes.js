const router = require('express').Router();
const { User, Job } = require('../models');
const withAuth = require('../utils/auth');

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


// Use withAuth middleware to prevent access to route
router.get('/jobs/:id', withAuth, async (req, res) => {
    try {
        const jobData = await Job.findByPk(req.params.id, {
            include: [
               {
                    model: Job,
                    attributes: ['id', 'name', 'description', 'job_swap', 'date_created', 'user_id'],
                    model: User,
                    attributes: ['name'],
               },
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const jobSingle = jobData.get({ plain: true });

        res.render('viewJob', {
            jobSingle,
            logged_in: req.session.logged_in
        });
    } catch (err) {
      console.log(err);
        res.status(500).json(err);
    }
});


// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//     try {
//        // Find the logged in user based on the session ID
//        const userData = await User.findByPk(req.session.user_id, {
//         attributes: { exculed: ['password'] },
//         include: [{ model: ... }],
//        });
       
//        const user = userData.get({ palin: true });

//        res.render('profile', {
//         ...user,
//         logged_in: true
//        });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/login', (req, res) => {
     // If the user is already logged in, redirect the request to another route
     if (req.session.logged_in) {
        res.redirect('/login');
        return;
     }

     res.render('login');
});

module.exports = router;