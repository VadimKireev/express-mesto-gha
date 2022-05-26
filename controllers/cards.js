const Card = require('../models/card');

module.exports.postCard = (req, res) => {
  console.log(req.user._id);
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Для создания карточки переданы некорректные данные' }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cardsList: cards }))
    .catch(() => res.status(404).send({ message: 'Карточки не найдены' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Некорректно указан ID карточки' }));
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Ошибка на стороне сервера' }));
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Ошибка на стороне сервера' }));
};
