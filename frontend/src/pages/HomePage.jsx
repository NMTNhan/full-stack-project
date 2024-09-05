import NavBar from '../components/NavBar';
import PostingArea from '../components/PostingArea';
import GroupSidebar from '../components/GroupSidebar';
import FriendSidebar from '../components/FriendSideBar';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import NotJoinGroupSideBar from '../components/NotJoinGroupSideBar';
import UserPosts from "../components/UserPosts";

const HomePage = () => {
  const { user , posts, setPosts } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [notJoinGroups, setNotJoinGroups] = useState([]);
  const [friendsInfo, setFriendsInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFriendsInfo()
  }, [user.friends]);

  useEffect(() => {
    fetchGroups();
    fetchNotJoinGroups();
  }, [user]);

  const fetchGroups = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/groups/${user.id}`);
        if (response.ok) {
            const groupsData = await response.json(); // Parse JSON data
            setGroups(groupsData); // Set groups state
        } else {
            throw new Error('Failed to fetch groups for the user');
        }
    } catch (error) {
        console.error(error);
        setError('Failed to load groups. Please try again later.'); // Set error message
    }
  };

  const fetchNotJoinGroups = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/groups/notjoin/${user.id}`);
        if (response.ok) {
            const groupsData = await response.json(); // Parse JSON data
            setNotJoinGroups(groupsData); // Set groups state
            console.log(groupsData);
        } else {
            throw new Error('Failed to fetch groups for the user');
        }
    } catch (error) {
        console.error(error);
        setError('Failed to load groups. Please try again later.'); // Set error message
    }
  }

  //Get all the friend info.
  const fetchFriendsInfo = async () => {
    try {
      const friendsData = await Promise.all(
          user.friends.map(async (friendId) => {
            const response = await fetch(`http://localhost:5000/api/friends/${friendId}`);
            if (response.ok) {
                const data = await response.json()
                return data.friend;
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
    <div className={'h-fit bg-gray-100'}>
      <NavBar />
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3">
          <GroupSidebar groups={groups} />
          &nbsp;
          <NotJoinGroupSideBar groups={notJoinGroups} />
        </div>
        <div className="col-span-6">
          <PostingArea />
            <UserPosts posts={posts.filter(post => user.friends.includes(post.author._id))} setPosts={setPosts}/>
        </div>
        <div className="col-span-3">
          <FriendSidebar friends={friendsInfo}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;