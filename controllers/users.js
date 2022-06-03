const User = require('../models/user');

const getUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }

      res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => { res.status(200).send(user); }).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const updateUser = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => { res.status(200).send(user); }).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getUser, getUsers, createUser, updateAvatar, updateUser,
};
