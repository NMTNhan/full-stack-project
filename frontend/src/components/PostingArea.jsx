import React, { useState } from 'react';

const PostingArea = () => {
  const [post, setPost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Posting: ${post}`);
    setPost('');
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="What's on your mind?"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostingArea;
