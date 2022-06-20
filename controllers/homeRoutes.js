const router = require('express').Router();
const { User, Job } = require('../models');
const withAuth = require('../utils/auth');

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

        // Serialize object
        const jobSingle = jobData.get({ plain: true });

        res.render('viewJob', {
            // Using spread operator
            ...jobSingle,
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

// Login page route


module.exports = router;