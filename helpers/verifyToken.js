const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('authorization');
    if (!token) return res.status(401).send('Unauthenticated');

    try {
        req.user = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        return next();
    } catch (err) {
        res.status(400).send('Token is invalid');
    }
}