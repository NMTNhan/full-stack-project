import React, { useState, useEffect } from 'react';

function ManageContent() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts(); // Don't forget to call the fetchPosts function
  }, []); // Add an empty dependency array to run the effect only once

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/admin`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Update post list after deletion
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Manage Content</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            {post.content}
            <button onClick={() => deletePost(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageContent;
