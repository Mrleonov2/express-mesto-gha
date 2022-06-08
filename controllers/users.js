const User = require('../models/user');

const BadRequestError = 400;

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
  User.findById(req.params.userId)

    .then((user) => {
      if (!user) {
        res.status(NotFoundError).send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.status(SuccesStatusCode).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(BadRequestError).send({ message: 'Id is not correct' });
        return;
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
        res.status(BadRequestError).send({ message: 'Переданы некорректные данные пользователя' });
        return;
      }
      res.status(DefaultError).send({ message: 'Произошла ошибка' });
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
        return;
      }
      res.status(SuccesStatusCode).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequestError).send({ message: 'Переданы некорректные данные при обновлении аватара' });
        return;
      }
      res.status(DefaultError).send({ message: 'Произошла ошибка' });
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
        return;
      }
      res.status(SuccesStatusCode).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequestError).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        return;
      }
      res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getUser, getUsers, createUser, updateAvatar, updateUser,
};
