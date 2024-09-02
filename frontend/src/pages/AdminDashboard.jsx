import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () => setIsUserModalOpen(false);

  const openContentModal = () => setIsContentModalOpen(true);
  const closeContentModal = () => setIsContentModalOpen(false);

  const openGroupModal = () => setIsGroupModalOpen(true);
  const closeGroupModal = () => setIsGroupModalOpen(false);

  useEffect(() => {
    if (isUserModalOpen) {
      fetchUsers();
    }
  }, [isUserModalOpen]);

  useEffect(() => {
    if (isContentModalOpen) {
      fetchPosts();
    }
  }, [isContentModalOpen]);

  useEffect(() => {
    if (isGroupModalOpen) {
      fetchPendingGroups();
    }
  }, [isGroupModalOpen]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  const toggleSuspension = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/suspend`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update user suspension status');
      }

      setUsers(users.map(user =>
        user._id === userId ? { ...user, isSuspended: !user.isSuspended } : user
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/admin`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchPendingGroups = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/groups/pending', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pending groups');
      }

      const data = await response.json();
      setGroups(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const approveGroup = async (groupId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/groups/${groupId}/approve`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to approve group');
      }

      setGroups(groups.filter(group => group._id !== groupId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manage Users */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
          <p className="text-gray-600 mb-4">View and manage user accounts.</p>
          <button 
            onClick={openUserModal} 
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Open Users
          </button>
        </div>

        {/* Manage Content */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Manage Content</h2>
          <p className="text-gray-600 mb-4">Review and manage posts.</p>
          <button 
            onClick={openContentModal} 
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Open Content
          </button>
        </div>

        {/* Pending Group Approvals */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pending Group Approvals</h2>
          <p className="text-gray-600 mb-4">Approve or reject new group requests.</p>
          <button 
            onClick={openGroupModal} 
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Open Group Approvals
          </button>
        </div>
      </div>

      {/* User Management Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            {error && <p className="text-red-600">{error}</p>}
            <ul>
              {users.map(user => (
                <li key={user._id} className="flex justify-between items-center mb-2">
                  <span>{user.username} - {user.isSuspended ? 'Suspended' : 'Active'}</span>
                  <button
                    onClick={() => toggleSuspension(user._id)}
                    className="text-sm bg-blue-600 text-white py-1 px-2 rounded"
                  >
                    {user.isSuspended ? 'Resume' : 'Suspend'}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={closeUserModal} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Content Management Modal */}
      {isContentModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Manage Content</h2>
            {error && <p className="text-red-600">{error}</p>}
            <ul>
              {posts.map(post => (
                <li key={post._id} className="flex justify-between items-center mb-2">
                  <span>{post.content}</span>
                  <button
                    onClick={() => deletePost(post._id)}
                    className="text-sm bg-red-600 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={closeContentModal} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Group Approval Modal */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Pending Group Approvals</h2>
            {error && <p className="text-red-600">{error}</p>}
            <ul>
              {groups.map(group => (
                <li key={group._id} className="flex justify-between items-center mb-2">
                  <span>{group.name}</span>
                  <button
                    onClick={() => approveGroup(group._id)}
                    className="text-sm bg-green-600 text-white py-1 px-2 rounded"
                  >
                    Approve
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={closeGroupModal} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
