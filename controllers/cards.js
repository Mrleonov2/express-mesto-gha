const Card = require('../models/card');

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,

  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
);

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
);
const getCards = (req, res) => Card.find({}).then((cards) => {
  res.status(200).send(cards);
});
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  likeCard, dislikeCard, getCards, createCard, deleteCard,
};
