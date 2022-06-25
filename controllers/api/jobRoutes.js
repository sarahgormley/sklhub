const router = require('express').Router();

router.post('/', async(req, res) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    res.sendStatus(200)
});

module.exports = router