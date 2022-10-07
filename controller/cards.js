const Card = require('../models/card');
const DefaultError = require('../errors/DefaultError');
const UnfindError = require('../errors/UnfindError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      throw new DefaultError();
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findById(req.params._id)
    .orFail(() => {
      throw new UnfindError('Карточка с указанным _id не найдена.');
    })
    .then((card) => {
      if (card.owner.toString() === userId) {
        Card.findByIdAndRemove(req.params._id)
          .then((removeCard) => {
            res.send(removeCard);
          });
      } else {
        throw new ForbiddenError('Недостаточно прав');
      }
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
      throw new UnfindError('Карточка с указанным _id не найдена.');
    })
    .then((card) => res.send(card))
    .catch(next);
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new UnfindError('Карточка с указанным _id не найдена.');
    })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, setLike, removeLike,
};
