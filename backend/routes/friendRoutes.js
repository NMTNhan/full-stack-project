const express = require('express');
const { getFriendInfoByID, unFriendByID, acceptFriendRequest} = require("../controllers/userController");
const router = express.Router();

router.get('/:id', getFriendInfoByID);

router.put('/unfriend/:id', unFriendByID)

router.put('/accept/:receiverID/:senderID', acceptFriendRequest)

module.exports = router;
