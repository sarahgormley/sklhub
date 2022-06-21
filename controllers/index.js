const router = require('express').Router();

const apiRoutes = require('./api');
const { route } = require('./homeRoutes');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/signin', dashboardRoutes);

module.exports = router;