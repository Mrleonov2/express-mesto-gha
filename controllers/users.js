const User = require('../models/user');

const BadReqestError = 400;

const NotFoundError = 404;

const DefaultError = 500;

const SuccesStatusCode = 200;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(SuccesStatusCode).send(users);
    })
    .catch(() => res.status(DefaultError).send({ message: 'Произошла ошибка' }));
};
const getUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(NotFoundError).send({ message: 'Пользователь по указанному _id не найден' });
      }

      res.status(SuccesStatusCode).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(BadReqestError).send({ message: 'Id is not correct' });
      }
      res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => {
      res.status(SuccesStatusCode).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadReqestError).send({ message: 'Переданы некорректные данные пользователя' });
      }res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NotFoundError)
          .send({ message: 'Пользователь с указанным _id не найден' });
      } res.status(SuccesStatusCode).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadReqestError).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};
const updateUser = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NotFoundError)
          .send({ message: 'Пользователь с указанным _id не найден' });
      } res.status(SuccesStatusCode).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadReqestError).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getUser, getUsers, createUser, updateAvatar, updateUser,
};
