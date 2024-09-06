const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Create a new post
const createPost = async (req, res) => {
  const { content, imageStatus, visibility } = req.body;

  // Check if content is provided
  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  if (req.file) {
    imageStatus = req.file.path; // Save the image path
  }

  try {
    const post = await Post.create({
      content,
      author: req.user._id, // The user ID is attached by the protect middleware
      imageStatus,
      visibility,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch all posts (with optional user filter)
const getPosts = async (req, res) => {
    const { userId } = req.query;
  
    try {
      const filter = userId ? { author: userId } : {};
      const posts = await Post.find(filter).populate('author', 'username avatar').sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Server error' });
    }
};

// Update a post by ID
const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { content, imageStatus } = req.body;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Ensure the user is the author of the post
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'User not authorized' });
      }
  
      // Update the post fields
      post.content = content || post.content;
      post.imageStatus = imageStatus || post.imageStatus;
  
      await post.save();
      res.json(post);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Server error' });
    }
};

// Delete a post by ID
const deletePost = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Ensure the user is the author of the post
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'User not authorized' });
      }
  
      await post.remove();
      res.json({ message: 'Post removed' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Server error' });
    }
};


// Like a post
const reactionOnPost = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the post has already been liked by the user
      if (post.likes.includes(req.user._id)) {
        return res.status(400).json({ message: 'Post already liked' });
      }
  
      post.likes.push(req.user._id);
      await post.save();
  
      res.json(post);
    } catch (error) {
      console.error('Error liking post:', error);
      res.status(500).json({ message: 'Server error' });
    }
};
  
const getCommentsForPost = async (req, res) => {
  try {
      const post = await Post.findById(req.params.postId).populate('comments.user', 'username');
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post.comments);
  } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ message: 'Server error' });
  }
};



// Comment on a post
const commentOnPost = async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const comment = {
        user: req.user._id,
        text,
      };
  
      post.comments.push(comment);
      await post.save();
  
      res.json(post);
    } catch (error) {
      console.error('Error commenting on post:', error);
      res.status(500).json({ message: 'Server error' });
    }
};
  

const deletePostByAdmin = async (req, res) => {
  try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }
      
      await post.remove();
      res.json({ message: 'Post deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteCommentByAdmin = async (req, res) => {
  try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
          return res.status(404).json({ message: 'Comment not found' });
      }
      
      await comment.remove();
      res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getCommentsForPost ,getPosts, createPost, updatePost, deletePost, reactionOnPost, commentOnPost, deletePostByAdmin, deleteCommentByAdmin  };
