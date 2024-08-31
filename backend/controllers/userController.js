const User = require('../models/User');

const getUserProfile = (req, res) => {
    // At this point, req.user should be populated by the protect middleware
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.json(req.user);
  };
  
  module.exports = { getUserProfile };
  