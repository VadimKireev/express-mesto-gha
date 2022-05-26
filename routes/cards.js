const router = require('express').Router();
const {
  postCard, getCards, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

router.post('/', postCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
