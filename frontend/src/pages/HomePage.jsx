import NavBar from '../components/NavBar';
import PostingArea from '../components/PostingArea';
import GroupSidebar from '../components/GroupSidebar';
import FriendSidebar from '../components/FriendSideBar';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";

const HomePage = () => {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [friendsInfo, setFriendsInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFriendsInfo()
  }, [user.friends]);

    useEffect(() => {
      fetchGroups();
    }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/groups/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
      setError('Failed to load groups. Please try again later.');
    }
  };

  //Get all the friend info.
  const fetchFriendsInfo = async () => {
    try {
      const friendsData = await Promise.all(
          user.friends.map(async (friendId) => {
            const response = await fetch(`http://localhost:5000/api/friends/${friendId}`);
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to fetch friend information');
            }
          })
      );
      setFriendsInfo(friendsData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3">
          <GroupSidebar groups={groups} /> {/* Use fetched groups here */}
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        </div>
        <div className="col-span-6">
          <PostingArea />
        </div>
        <div className="col-span-3">
          <FriendSidebar friends={friendsInfo}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;