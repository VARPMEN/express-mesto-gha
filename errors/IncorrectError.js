const { ERROR_INCORRECT } = require('./errorsCode');

class IncorrectError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INCORRECT;
  }
}

module.exports = IncorrectError;
