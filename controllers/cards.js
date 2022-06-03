const Card = require('../models/card');

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,

    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => { res.status(200).send(card); }).catch(() => { res.status(500).send({ message: 'Произошла ошибка' }); });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((card) => { res.status(200).send(card); }).catch(() => { res.status(500).send({ message: 'Произошла ошибка' }); });
};
const getCards = (req, res) => {
  Card.find({}).then((cards) => {
    res.status(200).send(cards);
  }).catch(() => { res.status(500).send({ message: 'Произошла ошибка' }); });
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: { _id: req.user._id } })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((data) => {
      res.send(data);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  likeCard, dislikeCard, getCards, createCard, deleteCard,
};
