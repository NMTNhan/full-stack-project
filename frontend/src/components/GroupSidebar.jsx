import React from 'react';

const GroupSidebar = ({ groups = [] }) => {
  return (
    <div className="p-4 bg-gray-50">
      <h3 className="font-bold text-lg mb-2">Groups</h3>
      {groups.map((group, index) => (
        <div className="mb-2" key={index}>
          <a href={`/Group/${group._id}`} className="text-blue-500 hover:text-blue-700">
            {group.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default GroupSidebar;
