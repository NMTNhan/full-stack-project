import React, { useState, useEffect } from 'react';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers(); // Call fetchUsers to run it on component mount
  }, []); // Add an empty dependency array to run the effect only once

  const toggleSuspension = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/suspend`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update user suspension status');
      }

      // Update user list after suspension/resumption
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isSuspended: !user.isSuspended } : user
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.isSuspended ? 'Suspended' : 'Active'}
            <button onClick={() => toggleSuspension(user._id)}>
              {user.isSuspended ? 'Resume' : 'Suspend'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageUsers;
