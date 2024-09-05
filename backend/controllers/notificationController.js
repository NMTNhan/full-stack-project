const Notification = require('../models/Notification');

const createNotification = async (req, res) => {
    const { senderID, type, message } = req.body;
    const {receiverID } = req.params;
    try {
        const notification = new Notification({
            senderID,
            receiverID,
            message,
            type,
        });
        await notification.save();
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getNotificationsByUserID = async (req, res) => {
    try {
        const notifications = await Notification.find({ receiverID: req.params.receiverID }).populate('senderID', 'username avatar').sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getNotificationByUserIDAndSenderID = async (req, res) => {
    try {
        const notifications = await Notification.find({ receiverID: req.params.receiverID, senderID: req.params.senderID }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { createNotification, getNotificationsByUserID, deleteNotification, getNotificationByUserIDAndSenderID };