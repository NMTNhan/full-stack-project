import React from 'react';

const GroupSidebar = () => {
  return (
    <div className="p-4 bg-gray-50">
      <h3 className="font-bold text-lg mb-2">Groups</h3>
      {/* Example group */}
      <div className="mb-2">
        <a href="#" className="text-blue-500 hover:text-blue-700">Group One</a>
      </div>
      <div>
        <a href="#" className="text-blue-500 hover:text-blue-700">Group Two</a>
      </div>
    </div>
  );
};

export default GroupSidebar;
