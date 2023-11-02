const { celebrate, Joi } = require('celebrate');

const regexp = /http[s]?:\/\/(www\.)?[\w\d\-\._~:\/?#\[\]@!\$'()*+,;=]+#?/im;

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateRenameUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateChangeAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexp),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateGetUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexp),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateLogin,
  validateRenameUser,
  validateChangeAvatar,
  validateCreateUser,
  validateGetUser,
  validateCreateCard,
  validateCardId,
};
