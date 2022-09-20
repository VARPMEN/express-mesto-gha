const { getUsers, getUser, createUser, changeInfo, changeAvatar } = require('../controller/users');
const router = require('express').Router();

router.get('/users', getUsers);

router.get('/users/:userId', getUser);

router.post('/users', createUser);

router.patch('/users/me', changeInfo);

router.patch('/users/me/avatar', changeAvatar);

module.exports = router;