const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const secretCode = 'bc3c4cc2fa303dd0d4825cdf1d396e84bfb71fd28b9ad7c26eb4a82b7f861697';

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, secretCode);
  } catch (err) {
    return next(err);
  }
  req.user = payload;
  return next();
};
