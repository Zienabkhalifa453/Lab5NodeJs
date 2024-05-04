const APIErrors = require("../utilities/APIErrors");
const userSchema = require("../utilities/validators/userValidation");

function userValidationMiddleware(req, res, next) {
  const user = req.body;
  userSchema
    .validateAsync(user)
    .then(() => next())
    .catch((error) => next(new APIErrors(error.message, 400)));
}

module.exports = userValidationMiddleware;
