const Joi = require("joi");


const taskSchema = Joi.object({
  
  title: Joi.string().required().min(3).max(25),
  duration: Joi.number().required().min(1).max(15),

});



module.exports = taskSchema;
