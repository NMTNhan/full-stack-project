const express = require('express');
const {createNotification, getNotificationsByUserID, deleteNotification, getNotificationByUserIDAndSenderID} = require("../controllers/notificationController");
const router = express.Router();

router.post('/create/:receiverID', createNotification)

router.get('/check/:senderID/:receiverID', getNotificationByUserIDAndSenderID)

router.get('/get/:receiverID', getNotificationsByUserID)

router.delete('/delete/:id', deleteNotification)

module.exports = router;
