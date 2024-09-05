const User = require('../models/User');
const Notification = require('../models/Notification');

const getUsers = async (req, res) => {
    try {
      const users = await User.find({}); // Fetch all users
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error, could not fetch users' });
    }
  };

const getUserProfile = (req, res) => {
    // At this point, req.user should be populated by the protect middleware
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.json(req.user);
  };

const getFriendInfoByID = async (req, res) => {
        try {
            const friend = await User.findById(req.params.id);
            if (!friend) {
                return res.status(404).json({ message: 'Friend not found' });
            }
            res.json(friend);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
};

const unFriendByID = async (req, res) => {
    try {
        const response = await User.updateOne(
            { _id: req.body.userID },
            { $pull: { friends: req.params.id } }
        );
        const response2 = await User.updateOne(
            { _id: req.params.id},
            { $pull: {friends: req.body.userID}}
        )
        if (response && response2) {
            res.json({ message: 'Unfriend successfully' });
        }
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

const acceptFriendRequest = async (req, res) => {
    const { senderID, receiverID } = req.params

    try {
        const sender = await User.findById(senderID)
        const receiver = await User.findById(receiverID)
        if (!sender || !receiver) {
            return res.status(404).json({message: 'User not found'});
        }

        const friendRequest = await Notification.findOne({senderID, receiverID, type: 'Friend Request'}).populate('senderID', 'username avatar')
        if (!friendRequest) {
            return res.status(404).json({message: 'Friend request not found'});
        }

        receiver.friends = [...receiver.friends, senderID]
        sender.friends = [...sender.friends, receiverID]

        await receiver.save()
        await sender.save()

        friendRequest.type = 'Friend Request Accepted'
        friendRequest.message = `You have accepted ${sender.username} friend request !`
        await Notification.updateOne({senderID, receiverID, type: 'Friend Request'}, { $set: {senderID: receiverID, receiverID: senderID,type: 'Friend Request Accepted',message: `${receiver.username} accepted your friend request !`} })

        res.json(friendRequest)
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

const rejectFriendRequest = async (req, res) => {
    const { senderID, receiverID } = req.params

    try {
        const sender = await User.findById(senderID)
        const receiver = await User.findById(receiverID)
        if (!sender || !receiver) {
            return res.status(404).json({message: 'User not found'});
        }

        const friendRequest = await Notification.findOne({senderID, receiverID, type: 'Friend Request'}).populate('senderID', 'username avatar')
        if (!friendRequest) {
            return res.status(404).json({message: 'Friend request not found'});
        }

        friendRequest.type = 'Friend Request Rejected'
        friendRequest.message = `You have rejected ${sender.username} friend request !`

        await Notification.updateOne({
            senderID,
            receiverID,
            type: 'Friend Request'
        }, {$set: {senderID: receiverID, receiverID: senderID,type: 'Friend Request Rejected', message: `${receiver.username} rejected your friend request !`}})

        res.json(friendRequest)
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }

}

const approveGroupRequest = async (req, res) => {
    try {
        const groupAuthorId = req.params.groupID;
        const adminId = req.params.adminID;

        await Notification.updateOne({
            senderID: groupAuthorId,
            receiverID: adminId,
            type: 'Group Request'
        },
            {$set: {
                senderId: adminId,
                receiverId: groupAuthorId,
                type: 'Create Group Request Accepted',
                message: 'Your group request has been accepted'}
        });
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

const suspendUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isSuspended = !user.isSuspended; // Toggle suspension status
        await user.save();

        res.json({ message: `User ${user.isSuspended ? 'suspended' : 'resumed'} successfully`, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getUserProfile, getFriendInfoByID, unFriendByID, getUsers, acceptFriendRequest, rejectFriendRequest, approveGroupRequest, suspendUser};
  