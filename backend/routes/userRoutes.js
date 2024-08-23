const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const {registerUser, loginUser} = require("../controllers/authController");

const router = express.Router();

router.get('/profile', protect, getUserProfile);

router.post('/register', registerUser)

router.post('/login', loginUser)

module.exports = router;
