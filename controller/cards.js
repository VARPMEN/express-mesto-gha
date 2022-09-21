const Card = require('../models/card');
const { getDefaultError, getError } = require('../errors/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => getDefaultError(res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      getError(err, res, 'при создании карточки');
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => {
      getError(err, res, '', 'Карточка с указанным _id не найдена.');
    });
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      getError(err, res, 'для постановки лайка', 'Передан несуществующий _id карточки.');
    });
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      getError(err, res, 'для снятии лайка', 'Передан несуществующий _id карточки.');
    });
};

module.exports = {
  getCards, createCard, deleteCard, setLike, removeLike,
};
