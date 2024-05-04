const APIErrors = require("../APIErrors");

const asyncHandler = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch((error) => {
    let err = null;
    if (error.message === "not found") {
      err = new APIErrors(error.message, 404);
    }
    next(err);
  });
};

module.exports = asyncHandler;


