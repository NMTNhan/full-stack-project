const express = require('express');
const {
    createNotification,
    getNotificationsByUserID,
    getNotificationByUserIDAndSenderID
} = require("../controllers/notificationController");
const {acceptFriendRequest, rejectFriendRequest, approveGroupRequest} = require("../controllers/userController");
const router = express.Router();

// Route to create a notification
router.post('/create/:receiverID', createNotification)

// Route to get notification by user ID and sender ID
router.get('/check/:senderID/:receiverID', getNotificationByUserIDAndSenderID)

// Route to get notifications by user ID
router.get('/get/:receiverID', getNotificationsByUserID)

// Route to accept friend request
router.put('/friend/accept/:receiverID/:senderID', acceptFriendRequest)

// Route to reject friend request
router.put('/friend/reject/:receiverID/:senderID', rejectFriendRequest)

// Route to approve group request
router.put('/admin/group/approve/:groupAuthorID/:adminID', approveGroupRequest)

module.exports = router;
