const router = require('express').Router();
const { cardValidation } = require('../middlewares/validation');
const {
  getCards, createCard, deleteCard, setLike, removeLike,
} = require('../controller/cards');

router.get('/cards', getCards);

router.post('/cards', cardValidation, createCard);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', setLike);

router.delete('/cards/:cardId/likes', removeLike);

module.exports = router;
