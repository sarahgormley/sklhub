const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('../dashboardRoutes');
const jobRoutes = require('./jobRoutes');

router.use('/users', userRoutes);
router.use('/signin', dashboardRoutes);
router.use('/signup', dashboardRoutes);
router.use('/jobs', jobRoutes);

module.exports = router;