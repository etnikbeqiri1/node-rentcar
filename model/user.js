const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: true,
            min: 2,
            max: 244
        },
        email: {
            type: String,
            required: true,
            min: 5,
            max: 244
        },
        username: {
            type: String,
            required: true,
            min: 1,
            max: 244
        },
        password: {
            type: String,
            required: true,
            max: 1024
        },
    }
);


module.exports = mongoose.model('User', userSchema);