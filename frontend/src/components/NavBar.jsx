import React, {useContext, useEffect, useState} from 'react';
import { FaSearch, FaBell, FaUserFriends, FaUserCircle } from 'react-icons/fa';
import {Link} from "react-router-dom";
import {UserContext} from "../App";
import FriendRequestCard from "./FriendRequestCard";

const NavBar = () => {
  const { user } = useContext(UserContext);
  const [friendRequests, setFriendRequests]  = useState([]);

  // Function to fetch all the friend request
    const fetchFriendRequests = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/notifications/get/${user._id}`);
            if (response.ok) {
              const friendRequestsFromFetching = await response.json();
              setFriendRequests(friendRequestsFromFetching);
            } else {
              throw new Error('Failed to fetch friend requests');
            }
        } catch (error) {
            console.error(error);
        }
    }

  useEffect(() => {
    fetchFriendRequests();
  }, [user.friends])

  return (
    <div className="navbar bg-base-100 px-4 shadow-md">
    {/* Left Side of NavBar */}
    <div className="flex items-center space-x-4">
      <a className="text-2xl font-bold text-black" href="/">Shitbook</a>
      <div className="relative flex items-center max-w-xs">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full pr-10"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </div>

    {/* Right Side */}
    <div className="flex-1 flex justify-end gap-4">
      {/* Friend Request Icon*/}
      <div className="dropdown dropdown-end max-h-27">
        <div tabIndex={0} className="indicator cursor-pointer">
          <FaUserFriends className="text-2xl text-gray-500" />
        </div>
        {/*Friend Request Icon: Dropdown */}
        <div
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box mt-3 overflow-auto"
        >
          {friendRequests && friendRequests.map((friendRequest) => {
            return (
                <>
                    <FriendRequestCard friendRequest={friendRequest} />
                </>
            )
          })}
        </div>
      </div>

      {/* Notification Icon  */}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} className="indicator cursor-pointer">
          <span className="indicator-item badge badge-secondary"></span>
          <FaBell className="text-2xl text-purple-600" />
        </div>
        {/*Notification Icon: Dropdown  */}
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3"
        >
          <li><a>Notification 1</a></li>
          <li><a>Notification 2</a></li>
          <li><a>See All Notifications</a></li>
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
            <Link to="/userprofile" className={'justify-between'}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
};

export default NavBar;