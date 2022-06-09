const router = require('express').Router();
const {
  postCard, getCards, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');
const { validatePostCard, validateCardId } = require('../middlewares/validations');

router.post('/', validatePostCard, postCard);
router.get('/', validateCardId, getCards);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, putLike);
router.delete('/:cardId/likes', validateCardId, deleteLike);

module.exports = router;
