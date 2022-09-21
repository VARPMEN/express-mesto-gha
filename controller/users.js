const User = require('../models/user');
const { getDefaultError, getError, getUnfindError } = require('../errors/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => getDefaultError(res));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => getUnfindError(res, 'Пользователь с указанным _id не найден.'))
    .then((user) => res.send(user))
    .catch((err) => {
      getError(err, res, 'при поиске пользователя');
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      getError(err, res, 'при создании пользователя');
    });
};

const changeInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => getUnfindError(res, 'Пользователь с указанным _id не найден.'))
    .then((user) => res.send(user))
    .catch((err) => {
      getError(err, res, 'при обновлении пользователя');
    });
};

const changeAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => getUnfindError(res, 'Пользователь с указанным _id не найден.'))
    .then((user) => res.send(user))
    .catch((err) => {
      getError(err, res, 'при обновлении аватара');
    });
};

module.exports = {
  getUsers, getUser, createUser, changeInfo, changeAvatar,
};
