const { getCards, createCard, deleteCard, setLike, removeLike } = require('../controller/cards');
const router = require('express').Router();

router.get('/cards', getCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', setLike);

router.delete('/cards/:cardId/likes', removeLike);

module.exports = router;