const Joi = require('joi');

exports.personSchema= Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    email: Joi.string().email().required()
});


