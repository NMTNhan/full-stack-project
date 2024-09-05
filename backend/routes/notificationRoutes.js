const express = require('express');
const {createNotification, getNotificationsByUserID, deleteNotification, getNotificationByUserIDAndSenderID} = require("../controllers/notificationController");
const {acceptFriendRequest, rejectFriendRequest, approveGroupRequest} = require("../controllers/userController");
const router = express.Router();

router.post('/create/:receiverID', createNotification)

router.get('/check/:senderID/:receiverID', getNotificationByUserIDAndSenderID)

router.get('/get/:receiverID', getNotificationsByUserID)

router.put('/friend/accept/:receiverID/:senderID', acceptFriendRequest)

router.put('/friend/reject/:receiverID/:senderID', rejectFriendRequest)

router.put('/admin/group/approve/:groupAuthorID/:adminID', approveGroupRequest)

router.delete('/delete/:id', deleteNotification)

module.exports = router;
