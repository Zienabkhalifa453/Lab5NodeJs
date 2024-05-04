const APIErrors = require("../utilities/APIErrors");
const taskSchema = require("../utilities/validators/taskValidation"); 

function validationMiddleware(req, res, next) {
  const task = req.body;
  taskSchema
    .validateAsync(task) 
    .then(() => next()) 
    .catch((error) => next(new APIErrors(error.message, 400)));
}

module.exports = validationMiddleware;
