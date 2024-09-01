import React from 'react';
// import UserPost from './UserPosts';

const PostComment = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <div className='flex justify-end'>
            <button className="bg-gray-500 text-white py-1 px-3 rounded mr-2" onClick={onClose}>
                X
            </button>
        </div>

        {/* <UserPost posts={posts}/> */}
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Write your comment here..."
        ></textarea>

        <div className="flex justify-center">
          
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded"
            onClick={onSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComment;