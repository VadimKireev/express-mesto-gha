const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const CommonError = require('../errors/CommonError');

const secretCode = 'bc3c4cc2fa303dd0d4825cdf1d396e84bfb71fd28b9ad7c26eb4a82b7f861697';

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie || !cookie.startsWith('jwt')) {
    throw new AuthError('Необходима авторизация');
  }
  const token = cookie.replace('jwt=', '');
  let payload;
  try {
    payload = jwt.verify(token, secretCode);
  } catch (err) {
    if (err.name === 'AuthError') {
      return next(err);
    }
    return next(new CommonError('Что-то пошло не так'));
  }
  req.user = payload;
  return next();
};
