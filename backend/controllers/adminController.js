const User = require('../models/User');
const Post = require('../models/Post');
const Group = require('../models/Group');

// Suspend User
const suspendUser = async (req, res) => {
    try {
        console.log('User ID:', req.params.id); // Log the user ID
        const user = await User.findById(req.params.id);
        if (user) {
            user.isSuspended = true;
            await user.save();
            res.json({ message: 'User suspended successfully' });
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
        console.log('Group ID:', req.params.id); // Log the group ID
        const group = await Group.findById(req.params.id);
        if (group) {
            group.isApproved = true;
            await group.save();
            res.json({ message: 'Group approved successfully' });
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        console.error('Error approving group:', error); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
};

const deletePostByAdmin = async (req, res) => {
    try {
        console.log('Post ID:', req.params.id); // Log the post ID
        const post = await Post.findById(req.params.id);
        if (post) {
            await post.remove();
            res.json({ message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error deleting post:', error); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Comment
const deleteCommentByAdmin = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (post) {
            const comment = post.comments.id(req.params.commentId);
            if (comment) {
                comment.remove();
                await post.save();
                res.json({ message: 'Comment deleted successfully' });
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    suspendUser,
    approveGroup,
    deletePostByAdmin,
    deleteCommentByAdmin,
};
