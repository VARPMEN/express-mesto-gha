const { ERROR_UNUNIQUE } = require('./errorsCode');

class UnuniqueError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNUNIQUE;
  }
}

module.exports = UnuniqueError;
