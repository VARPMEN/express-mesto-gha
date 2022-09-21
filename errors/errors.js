const ERROR_INCORRECT = 400;
const ERROR_UNFIND = 404;
const ERROR_DEFAULT = 500;

const getDefaultError = (res) => {
  res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
};

const getUnfindError = (res, mess) => {
  res.status(ERROR_UNFIND).send({ message: `${mess}` });
};

const getIncorrectError = (res, mess) => {
  res.status(ERROR_INCORRECT).send({ message: `Переданы некорректные данные ${mess}.` });
};

const getError = (err, res, incorMess, unfindMess) => {
  if (err.name === 'ValidationError') {
    getIncorrectError(res, incorMess);
  } else if (err.name === 'CastError') {
    getUnfindError(res, unfindMess);
  } else {
    getDefaultError(res);
  }
};

module.exports = { getDefaultError, getError, getUnfindError };
