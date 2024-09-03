import React, { useState } from 'react';
import PostComment from './PostComments'

const CommentButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitComment = () => {
    // logic for comment
    handleCloseModal();
  };

  return (
    <>
    <button className="ml-1" onClick={handleOpenModal}>
      Comment
    </button>
    <PostComment
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmitComment}
    />
  </>
  );
};

export default CommentButton;