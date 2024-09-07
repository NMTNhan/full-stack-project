const express = require('express');
const {getUserProfile, suspendUser, getUsers} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');
const {registerUser, loginUser} = require('../controllers/authController'); // Import these from authController
const {isAdmin} = require('../middleware/adminMiddleware');

const router = express.Router();

// Route to get all users
router.get('/users', protect, isAdmin, getUsers); // Get all users (admin only)

// Route to get the profile of the logged-in user
router.get('/profile', protect, getUserProfile); // Get the profile of the logged-in user

// Route to suspend a user
router.put('/:userId/suspend', protect, isAdmin, suspendUser); // Suspend a user (admin only)

// Register and login routes
router.post('/register', registerUser); // Register a new user

// Login route
router.post('/login', loginUser); // Login a user

module.exports = router;
