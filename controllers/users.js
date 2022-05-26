const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Для создания пользователя переданы некорректные данные' }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ usersList: users }))
    .catch(() => res.status(404).send({ message: 'Пользователи не найдены' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Некорректно указан ID пользователя' }));
};

module.exports.editProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send({ updatedUser: user }))
    .catch(() => res.status(400).send({ message: 'Для обновления данных о пользователе переданы некорректные данные' }));
};

module.exports.editAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((newAvatarLink) => res.send({ updatedAvatar: newAvatarLink }))
    .catch(() => res.status(400).send({ message: 'Для обновления данных о пользователе переданы некорректные данные' }));
};
