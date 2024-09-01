import React, { useState, useEffect } from 'react';

function ApproveGroups() {
  const [pendingGroups, setPendingGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingGroups = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/groups?status=pending'); // Adjust the API route as needed
        if (!response.ok) {
          throw new Error('Failed to fetch pending groups');
        }
        const data = await response.json();
        setPendingGroups(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPendingGroups();
  }, []);

  const approveGroup = async (groupId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/groups/approve/${groupId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent for authorization
        },
      });

      if (!response.ok) {
        throw new Error('Failed to approve group');
      }

      // Update the list of pending groups after approval
      setPendingGroups(pendingGroups.filter(group => group._id !== groupId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Pending Group Approvals</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {pendingGroups.map(group => (
          <li key={group._id}>
            {group.name}
            <button onClick={() => approveGroup(group._id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApproveGroups;
