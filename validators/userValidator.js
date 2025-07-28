const Joi = require('joi');

exports.regValidate = (body) => {
    const schema = Joi.object({
        email: Joi.string().email().required().trim(),
        password: Joi.string().required().min(8),
        username: Joi.string().max(50).trim().lowercase()
    });

    return schema.validate(body);
}

exports.logValidate = (body) => {
    const schema = Joi.object({
        email: Joi.string().required().email().trim(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(body);
}