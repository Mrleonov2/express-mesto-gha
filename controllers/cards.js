const Card = require("../models/card");
const likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  );

const dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  );
const getCards = (req, res) =>
  Card.find({}).then((cards) => {
    res.status(200).send(cards);
  });
const createCard = (req, res) => Card.create({name,link}).then(() => {});
const deleteCard = (req, res) => Card.findByIdAndDelete().then(() => {});

module.exports = { likeCard, dislikeCard, getCards, createCard, deleteCard };
