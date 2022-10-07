const IncorrectError = require('./IncorrectError');
const UnuniqueError = require('./UnuniqueError');

const throwError = (err, mess) => {
  if (err.name === 'ValidationError') {
    throw IncorrectError(`Переданы некорректные данные ${mess}.`);
  } else if (err.name === 'CastError') {
    throw IncorrectError(`Переданы некорректные данные ${mess}.`);
  } else if (err.code === 11000) {
    throw UnuniqueError('Невозможно зарегистрироваться! Пользователь уже существует.');
  }
};

module.exports = { throwError };
