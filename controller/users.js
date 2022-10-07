const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { throwError } = require('../errors/errors');
const DefaultError = require('../errors/DefaultError');

const UnfindError = require('../errors/UnfindError');
const InvalidError = require('../errors/InvalidError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      throw DefaultError();
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(() => {
      throw UnfindError('Пользователь с указанным _id не найден.');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      throwError(err, 'при поиске пользователя');
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw UnfindError('Пользователь с указанным _id не найден.');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      throwError(err, 'при поиске пользователя');
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch((err) => {
      throwError(err, 'при создании пользователя');
    })
    .catch(next);
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw InvalidError('Почта или пароль указаны неверно');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw InvalidError('Почта или пароль указаны неверно');
          }

          const token = jwt.sign({ _id: user.id }, 'secret-key', { expiresIn: '7d' });
          return res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true }).send({ message: 'Токен создан' });
        });
    })
    .catch(next);
};

const changeInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw UnfindError('Пользователь с указанным _id не найден.');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      throwError(err, 'при обновлении пользователя');
    })
    .catch(next);
};

const changeAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw UnfindError('Пользователь с указанным _id не найден.');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      throwError(err, 'при обновлении аватара');
    })
    .catch(next);
};

module.exports = {
  getUsers, getUser, createUser, changeInfo, changeAvatar, loginUser, getMe,
};
