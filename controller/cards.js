const Card = require('../models/card');
const { throwError } = require('../errors/errors');
const DefaultError = require('../errors/DefaultError');
const UnfindError = require('../errors/UnfindError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      throw DefaultError('Ошибка сервера!');
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      throwError(err, 'при создании карточки');
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findByIdAndRemove(req.params._id)
    .orFail(() => {
      throw UnfindError('Карточка с указанным _id не найдена.');
    })
    .then((card) => {
      if (!card.owner._id === userId) {
        throw ForbiddenError('Недостаточно прав');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      throwError(err, 'при удалении карточки');
    })
    .catch(next);
};

const setLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw UnfindError('Карточка с указанным _id не найдена.');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      throwError(err, 'для постановки лайка');
    })
    .catch(next);
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw UnfindError('Карточка с указанным _id не найдена.');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      throwError(err, 'для снятии лайка');
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, setLike, removeLike,
};
