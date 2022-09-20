const User = require('../models/user');

const getUsers = (req, res) => {
    User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: 'Error' }));
}

const getUser = (req, res) => {
    User.findById(req.params.userId)
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: 'Error' }));
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.send(user))
  .catch(() => res.status(500).send({ message: 'Error' }));
}

const changeInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true})
  .then(user => res.send(user))
  .catch(() => res.status(500).send({ message: 'Error' }));
}

const changeAvatar = (req, res) => {
  const { avatar } = req.body;
  
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
  .then(user => res.send(user))
  .catch(() => res.status(500).send({ message: 'Error' }));
}

module.exports = { getUsers, getUser, createUser, changeInfo, changeAvatar }