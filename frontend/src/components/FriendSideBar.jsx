import React from 'react';

const FriendSidebar = () => {
  return (
    <div className="p-4 bg-gray-50">
      <h3 className="font-bold text-lg mb-2">Friends</h3>
      {/* Example friend */}
      <div className="mb-2">
        <a href="#" className="text-blue-500 hover:text-blue-700">John Doe</a>
      </div>
      <div>
        <a href="#" className="text-blue-500 hover:text-blue-700">Jane Smith</a>
      </div>
    </div>
  );
};

export default FriendSidebar;
