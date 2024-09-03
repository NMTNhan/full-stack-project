const express = require('express');
const { createPost, getPosts, updatePost, deletePost, reactionOnPost, commentOnPost, deletePostByAdmin, deleteCommentByAdmin } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Route to create a post
router.post('/', protect, createPost);

// Route to get posts
router.get('/', protect, getPosts); // Use root ('/') to be consistent with your other API routes

// Route to update a post
router.put('/:postId', protect, updatePost);

// Route to delete a post
router.delete('/:postId', protect, deletePost);

// Route to like a post
// router.put('/:postId/like', protect, likePost);
router.put('/:postId/reactions', reactionOnPost); // Test without protect

// Route to comment on a post
router.post('/:postId/comment', protect, commentOnPost);

router.delete('/:postId/admin', protect, isAdmin, deletePostByAdmin); // Admin deletion route

router.delete('/comments/:commentId/admin', protect, isAdmin, deleteCommentByAdmin); // Admin comment deletion route

module.exports = router;
