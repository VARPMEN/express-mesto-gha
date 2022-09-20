const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send(cards))
  .catch(() => res.status(500).send({ message: 'Error' }));
}

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
  .then((card) => res.send(card))
  .catch(() => res.status(500).send({ message: 'Error' }));
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then(card => res.send(card))
  .catch(() => res.status(500).send({ message: 'Error' }));
}

const setLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, 
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
  .then(card => res.send(card))
  .catch(() => res.status(500).send({ message: 'Error' }));
}

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
  .then(card => res.send(card))
  .catch(() => res.status(500).send({ message: 'Error' }));
}

module.exports = { getCards, createCard, deleteCard, setLike, removeLike }