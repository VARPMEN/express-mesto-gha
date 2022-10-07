const { ERROR_UNFIND } = require('./errorsCode');

class UnfindError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNFIND;
  }
}

module.exports = UnfindError;
