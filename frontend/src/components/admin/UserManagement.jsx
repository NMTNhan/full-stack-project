import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSuspend = async (userId) => {
    try {
      await axios.put(`/api/admin/users/${userId}/suspend`);
      setUsers(users.map((user) => (user._id === userId ? { ...user, isActive: false } : user)));
    } catch (error) {
      console.error('Error suspending user:', error);
    }
  };

  const handleResume = async (userId) => {
    try {
      await axios.put(`/api/admin/users/${userId}/resume`);
      setUsers(users.map((user) => (user._id === userId ? { ...user, isActive: true } : user)));
    } catch (error) {
      console.error('Error resuming user:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user._id} className="py-2 flex justify-between items-center">
            <span>{user.username} - {user.isActive ? 'Active' : 'Suspended'}</span>
            <div>
              {user.isActive ? (
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleSuspend(user._id)}
                >
                  Suspend
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleResume(user._id)}
                >
                  Resume
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
