const router = require('express').Router();
const { User, Job } = require('../models');
const withAuth = require('../utils/auth');

// Jobs route to find all jobs
router.get('/', async(req, res) => {
    try {
        if (!req.session.logged_in) {
            return res.redirect('/signin')
        }
        // Get all job and JOIN with user data
        const jobData = await Job.findAll({
            include: [{
                model: User,
                attributes: ['name'],
            }, ],
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



// signin routes
router.get('/signin', (req, res) => {
    if (req.session.logged_in) {
        // If the user is already logged in, redirect the request to another route
        res.redirect('/');
        return;
    }
    res.render('signin');
});


// signup routes
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});



// New job routes
router.get('/newjob', (req, res) => {
    res.render('newJob');

});


router.get('/jobs', async(req, res) => {
    try {
        // Find the logged in user based on the session ID
        const jobData = await Job.findAll({
            include: [{
                model: Job,
                attributes: ['id', 'name', 'description', 'date_created', 'time_value', 'location', 'user_id'],
            },
            {
                model: User,
                attributes: ['name'],
            },
        ],
        });

        const user = jobData.get({ plain: true });

        res.render('jobs', {
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Use withAuth middleware to prevent access to route, single job route
router.get('/jobs/:id', async(req, res) => {
    try {
        const jobData = await Job.findByPk(req.params.id, {
            include: [{
                    model: Job,
                    attributes: ['id', 'name', 'description', 'date_created', 'time_value', 'job_swap', 'location', 'user_id'],
                },
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize object
        const job = jobData.get({ plain: true });

        res.render('singleJob', {
            // Using spread operator
            ...job,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async(req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: User }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;