const express = require('express');
const { createEditHistory, getEditHistory } = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create an edit history of the post
router.post('/create', protect, createEditHistory);

// Route to get edit history
router.get('/:postId', protect, getEditHistory);

module.exports = router;
