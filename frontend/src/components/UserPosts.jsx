import React from 'react';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

const UserPosts = ({ posts }) => {
  return (
    <div className="mt-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="mt-4 h-200 border rounded shadow-sm bg-white">
            <div className='p-4'>
              <div className='flex items-center'>
                <img 
                  src={post.avatar} 
                  alt={`Avartar of ${post.author}`} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p>{post.author}</p>
                  
                  <div className="text-sm text-gray-500">
                    <p>{post.timestamp}</p>
                  </div>
                </div>
              </div>
              <p className="pt-2">{post.content}</p>
            </div>
            {post.imageStatus && (
              <img 
                src={post.imageStatus} 
                alt={post.content} 
                className="w-full h-50 object-cover"
              />
            )}
            <div className='flex justify-between px-4 py-2'>
              <div className='text-gray-500'>{post.totalLike}</div>
              <div className='text-gray-500'>{post.totalComment} comments</div>
            </div>
            <div className='flex justify-between px-16'>
              <LikeButton initialCount={post.totalLike}/>
              <CommentButton />
            </div>
          </div>
        ))
      ) : (
        <p className='text-center'>No posts yet. Be the first to post something!</p>
      )}
    </div>
  );
};

export default UserPosts;