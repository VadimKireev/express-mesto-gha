const router = require('express').Router();
const {
  createUser, getUsers, getUser, editProfile, editAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', editProfile);
router.patch('/me/avatar', editAvatar);

module.exports = router;
