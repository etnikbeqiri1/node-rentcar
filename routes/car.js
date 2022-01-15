const router = require('express').Router();
const verify = require('../helpers/verifyToken');
const Car = require('../model/car');

router.get('/rental-cars', verify, async (req, res) => {
    let carFinder = Car.find({});
    if (req.query.year) {
        carFinder = carFinder.where('year').equals(req.query.year);
    }
    if (req.query.steering_type) {
        carFinder = carFinder.where('steering_type').equals(req.query?.steering_type)
    }
    if (req.query.number_of_seats) {
        carFinder = carFinder.where('number_of_seats').equals(req.query?.number_of_seats)
    }
    if (req.query.color) {
        carFinder = carFinder.where('color').equals(req.query.color);
    }
    const cars = await carFinder;
    res.json(cars);
});


router.post('/add', verify, async (req, res) => {
    const car = new Car({
        name: req.body.name,
        price_per_day: req.body.price_per_day,
        year: req.body.year,
        color: req.body.color,
        steering_type: req.body.steering_type,
        number_of_seats: req.body.number_of_seats,
    });
    try {
        const newCar = await car.save();
        res.send({car: newCar});
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;