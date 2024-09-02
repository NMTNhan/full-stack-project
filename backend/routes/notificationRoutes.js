const express = require('express');
const {createNotification, getNotificationsByUserID, deleteNotification, getNotificationByUserIDAndSenderID} = require("../controllers/notificationController");
const {acceptFriendRequest, rejectFriendRequest} = require("../controllers/userController");
const router = express.Router();

router.post('/create/:receiverID', createNotification)

router.get('/check/:senderID/:receiverID', getNotificationByUserIDAndSenderID)

router.get('/get/:receiverID', getNotificationsByUserID)

router.put('/accept/:receiverID/:senderID', acceptFriendRequest)

router.put('/reject/:receiverID/:senderID', rejectFriendRequest)

router.delete('/delete/:id', deleteNotification)

module.exports = router;
