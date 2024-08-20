import React, { useState } from 'react';
import PostComment from './PostComments'

const CommentButton = ({ className }) => {
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
    <button className="mr-4 px-3 py-1 border text-black-500" onClick={handleOpenModal}>
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
