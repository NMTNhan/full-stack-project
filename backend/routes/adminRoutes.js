const express = require('express');
const { getPendingGroups, getAllGroups, resumeUser, suspendUser, approveGroup, deletePostByAdmin, deleteCommentByAdmin, deleteGroup } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Define your admin routes here

router.put('/users/:id/resume', protect, isAdmin, resumeUser);

// Route to fetch all groups (approved and unapproved)
router.get('/groups', protect, isAdmin, getAllGroups); 

// Route to fetch only pending groups (unapproved)
router.get('/groups/pending', protect, isAdmin, getPendingGroups);

router.delete('/groups/:id', protect, isAdmin, deleteGroup);
router.put('/users/:id/suspend', protect, isAdmin, suspendUser);
router.put('/groups/:id/approve', protect, isAdmin, approveGroup);
router.delete('/posts/:id', protect, isAdmin, deletePostByAdmin);  // Deleting posts
router.delete('/posts/:postId/comments/:commentId', protect, isAdmin, deleteCommentByAdmin);




module.exports = router;
