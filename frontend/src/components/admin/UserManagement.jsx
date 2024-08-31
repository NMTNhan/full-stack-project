import React from 'react';

const UserManagement = () => {
  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <p>This section allows admins to manage user accounts. Features include:</p>
      <ul className="list-disc list-inside">
        <li>View all users</li>
        <li>Suspend active users</li>
        <li>Reactivate suspended users</li>
      </ul>
      {/* Placeholder for actual user management implementation */}
      <div className="mt-4">
        <button className="btn btn-primary">Manage Users</button>
      </div>
    </div>
  );
};

export default UserManagement;
