const express = require('express');
const {getFriendInfoByID, unFriendByID, acceptFriendRequest} = require("../controllers/userController");
const router = express.Router();

// Route to get friend info by ID
router.get('/:id', getFriendInfoByID);

// Route to unfriend by ID
router.put('/unfriend/:id', unFriendByID)

// Route to accept friend request
router.put('/accept/:receiverID/:senderID', acceptFriendRequest)

module.exports = router;
