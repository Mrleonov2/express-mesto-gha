const User = require("../models/user");
const getUser = (req, res) => {
  User.findById(req.user._id).then((user) => {
    if(!user){ res.status(404).send({message:'Пользователь по указанному _id не найден'});}

    res.status(201).send({data:user})}).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const getUsers = (req, res) => {
  User.find({}).then((users) => {
    res.status(200).send({data:users});
  }).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  if(!name|| !about|| !avatar){
    res.status(201).send({ message: 'Переданы некорректные данные при создании пользователя' });
  }
  User.create({name,about,avatar}).then((user) => {

    res.status(201).send({data:user});
  }).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const updateAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(req.params.userId,{avatar}).then((user) => {});
};
const updateUser = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(req.params.userId,{name, about}).then((user) => {});
};

module.exports = { getUser, getUsers, createUser, updateAvatar, updateUser };
