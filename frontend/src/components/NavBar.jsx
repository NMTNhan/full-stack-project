import React from 'react';
import { FaBell, FaUserFriends, FaUserCircle } from 'react-icons/fa';

const NavBar = ({ username }) => {
  return (
    <div className="navbar bg-base-100 px-4 shadow-md">
      {/* Left Side of NavBar */}
      <div className="flex items-center space-x-4">
        <a className="text-2xl font-bold text-black" href="/">Shitbook</a>
        <div className="relative flex items-center max-w-xs">

        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-end gap-4">
        {/* Friend Request Icon*/}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="indicator cursor-pointer">
            <FaUserFriends className="text-2xl text-gray-500" />
          </div>
          {/*Friend Request Icon: Dropdown */}
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3"
          >
            <li><a href="/">Friend Request 1</a></li>
            <li><a href="/">Friend Request 2</a></li>
            <li><a href="/">See All Friend Requests</a></li>
          </ul>
        </div>

        {/* Notification Icon */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="indicator cursor-pointer">
            <span className="indicator-item badge badge-secondary"></span>
            <FaBell className="text-2xl text-purple-600" />
          </div>
          {/*Notification Icon: Dropdown */}
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3"
          >
            <li><a href="/">Notification 1</a></li>
            <li><a href="/">Notification 2</a></li>
            <li><a href="/">See All Notifications</a></li>
          </ul>
        </div>

        {/* Profile Picture Icon */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <FaUserCircle className="text-3xl text-gray-600" />
            </div>
          </label>
          {/* Profile Picture Icon: Dropdown */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/userprofile" className="justify-between">
                Profile
              </a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
            <li>
              <a href="/login">Logout</a>
            </li>
          </ul>
        </div>


      </div>
    </div>
  );
};

export default NavBar;
