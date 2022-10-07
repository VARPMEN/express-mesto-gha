const IncorrectError = require('./IncorrectError');
const DefaultError = require('./DefaultError');
const UnuniqueError = require('./UnuniqueError');

const throwError = (err, mess) => {
  if (err.name === 'ValidationError') {
    throw IncorrectError(`Переданы некорректные данные ${mess}.`);
  } else if (err.name === 'CastError') {
    throw IncorrectError(`Переданы некорректные данные ${mess}.`);
  } else if (err.code === 11000) {
    throw UnuniqueError('Невозможно зарегистрироваться! Пользователь уже существует.');
  } else {
    throw DefaultError('На сервере произошла ошибка.');
  }
};

module.exports = { throwError };
