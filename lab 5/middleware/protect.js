const jwt = require("jsonwebtoken");
const APIError = require("../utilities/APIErrors");
function protect(req, res, next) {
  if (!req.headers.authorization) {
    next(new APIError("Not Authorized", 401));
  }
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, "ITI");

  req.user = user;

  console.log(req.user);

  next();
}

module.exports = protect;
