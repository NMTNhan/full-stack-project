const express = require('express');
const { createPost, getPosts, updatePost, deletePost, reactionOnPost, commentOnPost, deletePostByAdmin, deleteCommentByAdmin } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Route to create a post
router.post('/api/posts', protect, createPost);

// Route to get posts
// router.get('/', protect, getPosts); // Use root ('/') to be consistent with your other API routes
router.get('/', getPosts);

// Route to update a post
router.put('/:postId', updatePost);

// Route to delete a post
router.delete('/:postId', deletePost);

// Route to like a post
router.put('/:postId/reaction', reactionOnPost);

// Route to comment on a post
router.post('/:postId/comment', commentOnPost);

// router.delete('/:postId/admin', protect, isAdmin, deletePostByAdmin); // Admin deletion route

// router.delete('/comments/:commentId/admin', protect, isAdmin, deleteCommentByAdmin); // Admin comment deletion route

module.exports = router;
