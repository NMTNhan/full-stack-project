import React, { useState } from 'react';

const LikeButton = ({ initialCount = 0 }) => {
  const [likes, setLikes] = useState(initialCount);
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <button 
      onClick={handleLikeClick} 
      className={`mr-4 px-3 py-1 border ${liked ? 'text-blue-500' : 'text-black-500'}`}
    >
      Like
    </button>
  );
};

export default LikeButton;
