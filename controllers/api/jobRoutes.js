const router = require('express').Router();
const { Job } = require('../../models');

router.post('/', async(req, res) => {
    console.log(req.body);
    try {
        const newJob = await Job.create({
        
            name: req.body.jobTitle,
            description: req.body.jobDesc,
            location: req.body.jobLocation,
            time_value: +req.body.minsEarned,
            user_id: req.session.user_id,
        });

        res.status(200).json(newJob);


    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const jobData = await Job.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!jobData) {
            res.status(404).json({ message: "No job with this id!" });
            return;
        }

        res.status(200).json(jobData)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router