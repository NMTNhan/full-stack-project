const User = require('../models/User');
const Post = require('../models/Post');
const Group = require('../models/Group');
const { isValidObjectId } = require('mongoose');

// Suspend User
const suspendUser = async (req, res) => {
    try {
        console.log('User ID:', req.params.id);  // Log the user ID
        const user = await User.findById(req.params.id);
        if (user) {
            user.isSuspended = true;
            await user.save();
            res.json({ message: 'User suspended successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error suspending user:', error);  // Log the error
        res.status(500).json({ message: 'Server error' });
    }
};

// Resume User
const resumeUser = async (req, res) => {
    try {
        console.log('Resuming User ID:', req.params.id); // Log the user ID
        const user = await User.findById(req.params.id);
        if (user) {
            user.isSuspended = false;
            await user.save();
            res.json({ message: 'User resumed successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Approve Group
const approveGroup = async (req, res) => {
    try {
        console.log('Group ID:', req.params.id);  // Log the group ID
        const group = await Group.findById(req.params.id);
        if (group) {
            group.isApproved = true;
            await group.save();
            res.json({ message: 'Group approved successfully' });
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        console.error('Error approving group:', error);  // Log the error
        res.status(500).json({ message: 'Server error' });
    }
};

const getPendingGroups = async (req, res) => {
    try {
        const pendingGroups = await Group.find({ isApproved: false });
        res.json(pendingGroups);
    } catch (error) {
        console.error('Error fetching pending groups:', error); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
};


const deletePostByAdmin = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log('Post ID:', postId);  // Log the post ID
        
        if (!isValidObjectId(postId)) {
            return res.status(400).json({ message: 'Invalid post ID format' });
        }

        const post = await Post.findById(postId);
        if (post) {
            await post.deleteOne();  // Use deleteOne on the document instance
            res.json({ message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error deleting post:', error);  // Log the error
        res.status(500).json({ message: 'Server error' });
    }
};



const deleteCommentByAdmin = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (post) {
            const comment = post.comments.id(req.params.commentId);
            if (comment) {
                comment.remove();  // Remove the comment from the post
                await post.save();  // Save the post after comment removal
                res.json({ message: 'Comment deleted successfully' });
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error deleting comment:', error);  // Log the error
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    suspendUser,
    resumeUser,  // Add this line
    approveGroup,
    getPendingGroups,
    deletePostByAdmin,
    deleteCommentByAdmin,
};
