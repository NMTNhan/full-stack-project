const express = require('express');
const { getPendingGroups, resumeUser, suspendUser, approveGroup, deletePostByAdmin, deleteCommentByAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Define your admin routes here
router.put('/users/:id/resume', protect, isAdmin, resumeUser);
router.get('/groups', protect, isAdmin, getPendingGroups);
router.put('/users/:id/suspend', protect, isAdmin, suspendUser);
router.put('/groups/:id/approve', protect, isAdmin, approveGroup);
router.delete('/posts/:id', protect, isAdmin, deletePostByAdmin);  // Deleting posts
router.delete('/posts/:postId/comments/:commentId', protect, isAdmin, deleteCommentByAdmin);


module.exports = router;
