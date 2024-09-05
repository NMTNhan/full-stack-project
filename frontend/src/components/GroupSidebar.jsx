import React from 'react';
import {Link} from "react-router-dom";
import '../styles/GroupSideBar.css';

const GroupSidebar = ({ groups = [], user }) => {
    const createNotification = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/notifications/create/66d8107195bef057ee17b514`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({senderID: `${user.id}`, type: 'New Create Group Request', message: `${user.username} sent a new create group request`})
            });
            if (response.ok) {
                console.log('Add create group notification successfully');
                setIsAdded(true);
            } else {
                throw new Error('Failed to add create group notification');
            }
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className="p-4 bg-gray-50">
      <h3 className="font-bold text-lg mb-2">Groups</h3>
      {groups.map((group, index) => (
        <div className="mb-2" key={index}>
          <Link to={`/Group/${group._id}`} className="text-blue-500 hover:text-blue-700">
            {group.name}
          </Link>
        </div>
      ))}
      <button className='createGroupButton'>
        <Link to="/creategroup">Want to create new Group?</Link>
      </button>
    </div>
  );
};

export default GroupSidebar;
