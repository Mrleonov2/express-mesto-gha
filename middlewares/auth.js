const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'secret-code');
  } catch (err) {
    return next(new UnauthorizedError('Необходимо авторизироваться'));
  }
  req.user = payload;
  return next();
};
