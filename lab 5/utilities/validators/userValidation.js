const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
});

module.exports = userSchema;
