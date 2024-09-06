import React, {useContext, useState} from 'react';
import PostComment from './PostComments';
import {UserContext} from "../App";
// import {UserContext} from "../App";

const CommentButton = ({ postId, onNewComment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(UserContext);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const createNotification = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/notifications/create/${author}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({senderID: `${user.id}`, type: 'New Comment Added', message: `${user.username} commented on your post`})
  //     });
  //     if (response.ok) {
  //       console.log('Add comment successfully');
  //     } else {
  //       throw new Error('Failed to add comment');
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleSubmitComment = async (newComment) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment, avatar: user.avatar }), // Send the new comment as a JSON object
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const updatedPost = await response.json();
      // if (!response.ok) throw new Error(updatedPost.message);
      onNewComment(updatedPost.comments); // Update the comments in the parent component
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
    // handleCloseModal();
  };

  return (
    <>
    <button className="ml-1" onClick={handleOpenModal}>
    {/* {isModalOpen && <PostComment onSubmit={handleSubmitComment} />} */}
      Comment
    </button>
    <PostComment
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmitComment}
      comments={postId.comments}
    />
  </>
  );
};

export default CommentButton;