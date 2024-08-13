import React from 'react';
import NavBar from '../components/NavBar';
import UserManagement from '../components/Admin/UserManagement';
import GroupManagement from '../components/Admin/GroupManagement';
import PostManagement from '../components/Admin/PostManagement';

const AdminDashboard = () => {
  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="col-span-1">
          <UserManagement />
        </div>
        <div className="col-span-1">
          <GroupManagement />
        </div>
        <div className="col-span-1">
          <PostManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
