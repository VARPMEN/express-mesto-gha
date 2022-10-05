const router = require('express').Router();
const { idValidation, cardValidation } = require('../middlewares/validation');
const {
  getCards, createCard, deleteCard, setLike, removeLike,
} = require('../controller/cards');

router.get('/cards', getCards);

router.post('/cards', cardValidation, createCard);

router.delete('/cards/:cardId', idValidation, deleteCard);

router.put('/cards/:cardId/likes', idValidation, setLike);

router.delete('/cards/:cardId/likes', idValidation, removeLike);

module.exports = router;
