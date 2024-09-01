const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Set expiration time, e.g., 1 day
  });
};

module.exports = generateToken;
