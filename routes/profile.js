const router = require('express').Router();
const verify = require('../helpers/verifyToken');
const User = require('../model/user');

router.get('/', verify, async (req, res) => {
    const user = await User.findOne({_id: req.user._id}, {password: 0});
    res.json({
        user: user
    })
});

module.exports = router;