const router = require('express').Router();

const {
  validateCreateCard,
  validateCardId,
} = require('../middlewares/validation');

const {
  createCard,
  getCards,
  removeCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/cards', validateCreateCard, createCard);
router.get('/cards', getCards);
router.delete('/cards/:cardId', validateCardId, removeCard);
router.put('/cards/:cardId/likes', validateCardId, likeCard);
router.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
