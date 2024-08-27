const express = require('express');
const { createPost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a post
router.post('/', protect, createPost);

module.exports = router;
