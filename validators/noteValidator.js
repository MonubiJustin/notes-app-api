const Joi = require('joi');

exports.createNote = (body) => {
    const schema = Joi.object({
        title: Joi.string().required().max(100).trim(),
        content: Joi.string().trim().max(5000),
        isShared: Joi.boolean()
    })

    return schema.validate(body);
}

exports.updateNote = (body) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(100).trim(),
        content: Joi.string().max(5000).trim(),
        isShared: Joi.boolean()
    }).min(1);  // Require at least one field

    return schema.validate(body);
}