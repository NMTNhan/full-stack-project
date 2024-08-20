import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import PostingArea from '../components/PostingArea';
import UserPosts from '../components/UserPosts';
import GroupSidebar from '../components/GroupSidebar';
import FriendSidebar from '../components/FriendSideBar';
import {initialPosts} from '../model/PostModel'

const UserPage = () => {
  
  // Function to add posts
  const [posts, setPosts] = useState(initialPosts);

  // Function to add a new post
  const DisplayPost = (content) => {
    const newPost = {
      id: posts.length + 1, // Auto-incrementing ID
      content: content,
      author: "Current User", // Replace with actual user info
      timestamp: new Date().toLocaleString(),
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-3">
          <GroupSidebar />
        </div>

        <div className="col-span-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold">User Profile</h1>
          </div>

          <PostingArea addPost={DisplayPost} />
          <UserPosts posts={posts} />
        </div>

        <div className="col-span-3">
          <FriendSidebar />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
