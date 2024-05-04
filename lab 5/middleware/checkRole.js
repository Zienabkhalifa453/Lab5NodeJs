const APIError = require("../utilities/APIErrors");

function checkRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      next(new APIError("not authorized!", 401));
    }
    next();
  };
}

module.exports = checkRole;
