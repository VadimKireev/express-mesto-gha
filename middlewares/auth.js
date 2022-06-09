const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const CommonError = require('../errors/CommonError');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie || !cookie.startsWith('jwt')) {
    throw new AuthError('Необходима авторизация');
  }
  const token = cookie.replace('jwt=', '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === 'AuthError') {
      return next(err);
    }
    return next(new CommonError('Что-то пошло не так'));
  }
  req.user = payload;
  return next();
};
