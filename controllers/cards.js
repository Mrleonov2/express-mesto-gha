const Card = require('../models/card');

const BadRequestError = 400;

const NotFoundError = 404;

const DefaultError = 500;

const SuccesStatusCode = 200;

const getCards = (req, res) => {
  Card.find({}).then((cards) => {
    res.status(SuccesStatusCode).send(cards);
  }).catch(() => {
    res.status(DefaultError)
      .send({ message: 'Произошла ошибка' });
  });
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: { _id: req.user._id } })
    .then((user) => { res.status(SuccesStatusCode).send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequestError)
          .send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((data) => {
      if (!data) {
        res.status(NotFoundError).send({ message: 'Карточка с указанным _id не найдена' });
      }
      res.status(SuccesStatusCode);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(BadRequestError)
          .send({ message: 'Переданы некорректные данные для постановки лайка' });
      }
      res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,

    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(NotFoundError)
        .send({ message: 'Передан несуществующий _id карточки' });
    }
    res.status(SuccesStatusCode).send(card);
  })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(BadRequestError)
          .send({ message: 'Переданы некорректные данные для постановки лайка' });
      } res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(NotFoundError)
        .send({ message: 'Передан несуществующий _id карточки' });
    }
    res.status(SuccesStatusCode).send(card);
  })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(BadRequestError)
          .send({ message: 'Переданы некорректные данные для снятия лайка' });
      } res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};
module.exports = {
  likeCard, dislikeCard, getCards, createCard, deleteCard,
};
