class APIErrors extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
    statusCode;
  }
  
  module.exports = APIErrors;
  