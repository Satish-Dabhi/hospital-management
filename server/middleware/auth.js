const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'my_secret_key';


const auth = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

const verifyToken = function (req, res, next) {
  const { body } = req;
  const { token } = body;

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid', valid: false });
      } else {
        return res.status(200).json({ msg: 'Token is valid', valid: true });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  auth,
  verifyToken
}