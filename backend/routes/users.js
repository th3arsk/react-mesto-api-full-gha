const router = require('express').Router();

const {
  validateRenameUser,
  validateChangeAvatar,
  validateGetUser,
} = require('../middlewares/validation');

const {
  getUser,
  getUsers,
  renameUser,
  changeAvatar,
  getMe,
} = require('../controllers/users');

router.get('/users', getUsers);
router.patch('/users/me', validateRenameUser, renameUser);
router.patch('/users/me/avatar', validateChangeAvatar, changeAvatar);
router.get('/users/me', getMe);
router.get('/users/:userId', validateGetUser, getUser);

module.exports = router;
