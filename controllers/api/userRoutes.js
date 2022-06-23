const router = require('express').Router();
const { User } = require('../../models');

console.log(User);

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const userData = await User.create(req.body);
        console.log(1);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
    
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email }});

        if (!userData) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // This code checking password
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400)
            .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // These lines save the information in the session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else {
        res.status(404).end();
    }
});

module.exports = router;
