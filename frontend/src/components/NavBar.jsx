import {FaBell, FaUserCircle, FaUserFriends} from 'react-icons/fa';
import {Link} from "react-router-dom";
import {UserContext} from "../App";
import FriendRequestCard from "./FriendRequestCard";
import {useContext, useEffect, useState} from "react";
import {NotificationCard} from "./NotificationCard";

const NavBar = () => {
    const { user } = useContext(UserContext);
    const [notifications, setNotifications]  = useState([]);

    // Function to fetch all the friend request
    const fetchFriendRequests = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/notifications/get/${user.id}`);
            if (response.ok) {
                const data = await response.json();
                setNotifications(data);
            } else {
                throw new Error('Failed to fetch friend requests');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (user && user.id) {
            fetchFriendRequests();
        } else {
            console.error('User ID is not defined'); // Debug log
        }
    }, [user])



    return (
        <div className="navbar bg-base-100 px-4 shadow-md">
            {/* Left Side of NavBar */}
            <div className="flex items-center space-x-4">
                <a className="text-2xl font-bold text-black" href="/homepage">Shitbook</a>
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
                    </ul>
                </div>

                {/* Notification Icon */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="indicator cursor-pointer">
                        <span className="indicator-item badge badge-secondary"></span>
                        <FaBell className="text-2xl text-purple-600" />
                    </div>
                    {/*Notification Icon: Dropdown */}
                    <div
                        tabIndex={0}
                        className="overflow-y-auto dropdown-content p-2 shadow bg-base-100 rounded-box w-96 max-h-96 mt-3 gap-2 "
                    >
                        {notifications.map((notification) => {
                            if (notification.type === 'Friend Request') {
                                return (
                                    <FriendRequestCard key={notification._id} friendRequest={notification} notifications={notifications} setNotifications={setNotifications} />
                            );
                            } else {
                                return (
                                    <NotificationCard notification={notification} />
                                )
                            }
                        })}
                    </div>
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
                            <Link to="/">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;