const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getDefaultError, getError } = require('../errors/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => getDefaultError(res));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      getError(err, res, 'при поиске пользователя', 'Пользователь с указанным _id не найден.');
    });
};

const getMe = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      res.send({ message: err });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      getError(err, res, 'при создании пользователя');
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Почта или пароль указаны неверно'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Почта или пароль указаны неверно'));
          }

          const token = jwt.sign({ _id: user.id }, 'secret-key', { expiresIn: '7d' });
          return res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true }).send({ message: 'Токен создан' });
        });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

const changeInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      getError(err, res, 'при обновлении пользователя', 'Пользователь с указанным _id не найден.');
    });
};

const changeAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      getError(err, res, 'при обновлении аватара', 'Пользователь с указанным _id не найден.');
    });
};

module.exports = {
  getUsers, getUser, createUser, changeInfo, changeAvatar, loginUser, getMe,
};
