const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.split('Bearer ')[1];

  if (!token) {
    next(new AuthorizationError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev_secret');
  } catch (error) {
    next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
