const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        username: Joi.string().min(2).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(2).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;