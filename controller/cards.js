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
  const { _id } = req.params.owner;
  if (!(_id === req.user._id)) {
    throw new Error('Недостаточно прав!');
  }

  Card.findByIdAndRemove(req.params._id)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      getError(err, res, 'при удалении карточки', 'Карточка с указанным _id не найдена.');
    });
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      getError(err, res, 'для постановки лайка', 'Карточка с указанным _id не найдена.');
    });
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      getError(err, res, 'для снятии лайка', 'Карточка с указанным _id не найдена.');
    });
};

module.exports = {
  getCards, createCard, deleteCard, setLike, removeLike,
};
