import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/GroupSideBar.css';
import axios from 'axios';

const GroupSidebar = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('token');  // Retrieve the token from localStorage
        const response = await axios.get('http://localhost:5000/api/groups', {
          headers: {
            Authorization: `Bearer ${token}`  // Include the token in the request headers
          }
        });
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
        setError("Failed to load groups");
      }
    };
  
    fetchGroups();
  }, []);
  
  

  
  return (
    <div className="p-4 bg-gray-50">
      <h3 className="font-bold text-lg mb-2">Groups</h3>
      {error && <p className="text-red-500">{error}</p>}
      {groups.length > 0 ? (
        groups.map((group, index) => (
          <div className="mb-2" key={index}>
            <Link to={`/Group/${group._id}`} className="text-blue-500 hover:text-blue-700">
              {group.name}
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No approved groups available</p>
      )}
      <button className='createGroupButton'>
        <Link to="/creategroup">Want to create new Group?</Link>
      </button>
    </div>
  );
};

export default GroupSidebar;
