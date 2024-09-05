import React, {useContext, useState} from 'react';
import PostComment from './PostComments'
import {UserContext} from "../App";

const CommentButton = ({ comments, author }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(UserContext)

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const createNotification = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/create/${author}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({senderID: `${user.id}`, type: 'New Comment Added', message: `${user.username} commented on your post`})
      });
      if (response.ok) {
        console.log('Add comment successfully');
      } else {
        throw new Error('Failed to add comment');
      }
    } catch (error) {
      console.error(error)
    }
  }

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