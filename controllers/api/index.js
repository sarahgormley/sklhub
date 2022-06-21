const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('../dashboardRoutes');

router.use('/users', userRoutes);
router.use('/signin', dashboardRoutes);
router.use('/signup', dashboardRoutes);

module.exports = router;