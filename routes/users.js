const router = require('express').Router();
const {
  getUsers, getUser, changeInfo, changeAvatar, getMe,
} = require('../controller/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.get('/users/:userId', getUser);

router.patch('/users/me', changeInfo);

router.patch('/users/me/avatar', changeAvatar);

module.exports = router;
