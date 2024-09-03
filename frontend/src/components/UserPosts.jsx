import React, { useState, useEffect } from "react";
import ReactionButton from './ReactionButton';
import CommentButton from './CommentButton';

const UserPosts = ({ posts, setPosts }) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts on component mount
    const fetchPosts = async (userId) => {
      try {
        const url = userId
          ? `http://localhost:5000/api/posts?userId=${userId}`
          : `http://localhost:5000/api/posts`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: HTTP error! status: ${response.status}`);
        }

        const postsData = await response.json();
        setPosts(postsData);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [setPosts]);

  if (loading) return <p className='text-center'>Loading posts...</p>;

  if (error) return <p className='text-center text-red-500'>Error: {error}</p>;

  return (
    <div className="mt-4">
      {posts.length > 0 ? (
        posts.map((post) => {
          // Calculate total reactions
          const totalReactions = (
            (post.reactions?.like?.length || 0) +
            (post.reactions?.love?.length || 0) +
            (post.reactions?.funny?.length || 0) +
            (post.reactions?.sad?.length || 0) +
            (post.reactions?.angry?.length || 0)
          );

          const totalComments = post.comments?.length || 0;

          // const totalComments = post.totalComment // Test with data

          return (
            <div key={post._id} className="mt-4 h-200 border rounded shadow-sm bg-white">
              <div className='p-4'>
                <div className='flex items-center'>
                  <img 
                    src={post.avatar} 
                    // src={post.author.avatar} 
                    // src={user.avatar} 
                    alt={`Avatar of ${post.author}`} 
                    // alt={`Avatar of ${post.author.username}`} 
                    // alt={`Avatar of ${user.username}`} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p>{post.author}</p>
                    {/* <p>{post.author.username}</p> */}
                    {/* <p>{user.username}</p> */}
                    <div className="text-sm text-gray-500">
                      <p>{new Date(post.timestamp).toLocaleString()}</p>
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
                <div className='text-gray-500'>{totalReactions}</div>
                {totalComments > 0 && (
                  <div className='text-gray-500'>
                    {totalComments >= 2
                      ? `${totalComments} comments`
                      : `${totalComments} comment`}
                  </div>
                )}
              </div>
              <div className='flex justify-between px-16'>
                <ReactionButton 
                  type="like" // Specify the type for the ReactionButton
                  onReaction={(reactionType) => 
                    console.log(reactionType) // Show to Test
                  }
                />
                <CommentButton comments={post.comments} />
              </div>
            </div>
          );
        })
      ) : (
        <p className='text-center'>No posts yet. Be the first to post something!</p>
      )}
    </div>
  );
};

export default UserPosts;
