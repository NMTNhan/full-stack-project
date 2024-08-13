import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch pending group requests from the API
    const fetchGroups = async () => {
      try {
        const response = await axios.get('/api/groups/pending');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, []);

  const handleApprove = async (groupId) => {
    try {
      await axios.put(`/api/admin/groups/${groupId}/approve`);
      setGroups(groups.filter((group) => group._id !== groupId));
    } catch (error) {
      console.error('Error approving group:', error);
    }
  };

  const handleReject = async (groupId) => {
    try {
      await axios.delete(`/api/admin/groups/${groupId}`);
      setGroups(groups.filter((group) => group._id !== groupId));
    } catch (error) {
      console.error('Error rejecting group:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Group Management</h2>
      <ul className="divide-y divide-gray-200">
        {groups.map((group) => (
          <li key={group._id} className="py-2 flex justify-between items-center">
            <span>{group.name}</span>
            <div>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => handleApprove(group._id)}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleReject(group._id)}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupManagement;
