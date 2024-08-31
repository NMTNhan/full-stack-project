const express = require('express');
const { createPost, getPosts, updatePost, deletePost, likePost, commentOnPost } = require('../controllers/postController'); // Make sure updatePost is imported
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a post
router.post('/', protect, createPost);

// Route to get posts
router.get('/', protect, getPosts);

// Route to update a post
router.put('/:postId', protect, updatePost);

// Route to delete a post
router.delete('/:postId', protect, deletePost);

// Route to like a post
router.put('/:postId/like', protect, likePost);

// Route to comment on a post
router.post('/:postId/comment', protect, commentOnPost);

module.exports = router;
