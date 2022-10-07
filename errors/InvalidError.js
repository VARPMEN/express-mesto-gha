const { ERROR_INVALID_TOKEN } = require('./errorsCode');

class InvalidError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INVALID_TOKEN;
  }
}

module.exports = InvalidError;
