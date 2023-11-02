const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthorizationError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (error) {
    next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
