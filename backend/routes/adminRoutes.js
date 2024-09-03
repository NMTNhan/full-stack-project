const express = require('express');
const { suspendUser, deletePostByAdmin, deleteCommentByAdmin, approveGroup } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Define your admin routes here
router.get('/users', protect, isAdmin, getUsers); // Get all users (admin only)
router.put('/users/:id/suspend', protect, isAdmin, suspendUser);
router.delete('/posts/:id', protect, isAdmin, deletePostByAdmin);
router.delete('/comments/:id', protect, isAdmin, deleteCommentByAdmin);
router.put('/groups/:id/approve', protect, isAdmin, approveGroup);

module.exports = router;
