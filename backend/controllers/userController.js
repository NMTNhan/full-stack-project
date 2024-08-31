const User = require('../models/User');

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
        if (response) {
            res.json({ message: 'Unfriend successfully' });
        }
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = { getUserProfile, getFriendInfoByID, unFriendByID };
  