const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            min: 2,
            max: 244
        },
        price_per_day: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true,
            min: 2,
            max: 244
        },
        steering_type: {
            type: String,
            required: true,
            min: 2,
            max: 244
        },
    number_of_seats: {
            type: Number,
            required: true
        },

    }
);


module.exports = mongoose.model('Car', carsSchema);