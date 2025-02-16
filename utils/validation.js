const Joi = require('joi');

const validateCreatePost = (data) => {
const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(500).required()

});
return schema.validate(data);
}



module.exports = { validateCreatePost };