import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostManagement = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/admin/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Post Management</h2>
      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <li key={post._id} className="py-2 flex justify-between items-center">
            <span>{post.content.substring(0, 50)}...</span>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(post._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostManagement;
