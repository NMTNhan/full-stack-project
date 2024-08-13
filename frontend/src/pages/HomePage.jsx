import React from 'react';
import NavBar from '../components/NavBar';
import PostingArea from '../components/PostingArea';
import GroupSidebar from '../components/GroupSidebar';
import FriendSidebar from '../components/FriendSideBar';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3">
          <GroupSidebar />
        </div>
        <div className="col-span-6">
          <PostingArea />
        </div>
        <div className="col-span-3">
          <FriendSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
