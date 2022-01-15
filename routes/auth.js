const router = require('express').Router();
const User = require('../model/user');
const {registerValidation, loginValidation} = require('../helpers/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send({'error': error.details[0].message});

    const emailExists = await User.findOne({email: req.body.email});
    const usernameExists = await User.findOne({username: req.body.username});

    if (emailExists && usernameExists) {
        return res.status(400).send({'error': 'Email and Username exists'})
    } else if (usernameExists) {
        return res.status(400).send({'error': 'Username exists'});
    } else if (emailExists) {
        return res.status(400).send({'error': 'Email exists'});
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
    });
    try {
        const newUser = await user.save();
        res.send({'user_id': newUser._id, 'message': 'User Registered'});
    } catch (err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send({'error': error.details[0].message});

    const user = await User.findOne({username: req.body.username});

    if (!user) return res.status(400).send({'error': "User doesn't exist"});


    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({'error': "Incorrect Password"});

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    res.send({
        _id: user._id,
        'token': token
    });
});
module.exports = router;