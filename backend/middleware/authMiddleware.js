const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
  
        // Decode the token and find the user by ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        // Find the user by ID from the token payload
        req.user = await User.findById(decoded.userId).select('-password');
  
        if (!req.user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        next();
      } catch (error) {
        console.error('Error in protect middleware:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
  
  module.exports = { protect };
