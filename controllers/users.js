const User = require("../models/user");
const getUser = (req, res) => {
  User.findById(id).then((user) => {});
};
const getUsers = (req, res) => {
  User.find({}).then((users) => {
    res.status.send(users);
  });
};
const createUser = (req, res) => {
  User.create.then((users) => {
    res.status(201).send;
  });
};
const updateAvatar = (req, res) => {
  User.update.then((users) => {});
};
const updateUser = (req, res) => {
  User.update.then((users) => {});
};

module.exports = { getUser, getUsers, createUser, updateAvatar, updateUser };
