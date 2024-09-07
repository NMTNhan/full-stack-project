import NavBar from '../components/NavBar';
import PostingArea from '../components/PostingArea';
import GroupSidebar from '../components/GroupSidebar';
import FriendSidebar from '../components/FriendSideBar';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import NotJoinGroupSideBar from '../components/NotJoinGroupSideBar';
import UserPosts from "../components/UserPosts";

const HomePage = () => {
    const {user, posts, setPosts} = useContext(UserContext);
    const [groups, setGroups] = useState([]);
    const [notJoinGroups, setNotJoinGroups] = useState([]);
    const [friendsInfo, setFriendsInfo] = useState([]);

    // Fetch friends info on component mount
    useEffect(() => {
        fetchFriendsInfo()
    }, [user.friends]);

    // Fetch groups and not join groups on component mount
    useEffect(() => {
        fetchGroups();
        fetchNotJoinGroups();
    }, [user]);

    // Fetch groups
    const fetchGroups = async () => {
        try {
            // Fetch groups
            const response = await fetch(`http://localhost:5000/api/groups/${user.id}`);

            // Check if response is ok
            if (response.ok) {
                const groupsData = await response.json();
                setGroups(groupsData);
            } else {
                throw new Error('Failed to fetch groups for the user');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch not join groups
    const fetchNotJoinGroups = async () => {
        try {
            // Fetch not join groups
            const response = await fetch(`http://localhost:5000/api/groups/notjoin/${user.id}`);

            // Check if response is ok
            if (response.ok) {
                const groupsData = await response.json();
                setNotJoinGroups(groupsData);
            } else {
                throw new Error('Failed to fetch groups for the user');
            }
        } catch (error) {
            console.error(error);
        }
    }

    //Get all the friend info.
    const fetchFriendsInfo = async () => {
        try {
            // Fetch friends info
            const friendsData = await Promise.all(
                user.friends.map(async (friendId) => {
                    const response = await fetch(`http://localhost:5000/api/friends/${friendId}`);
                    if (response.ok) {
                        const data = await response.json();
                        return data.friend;
                    } else {
                        throw new Error('Failed to fetch friend information');
                    }
                })
            );

            // Set friends info
            setFriendsInfo(friendsData);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch posts
    useEffect(() => {
        // Fetch posts on component mount
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');

                const url = `http://localhost:5000/api/posts`;

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch posts: HTTP error! status: ${response.status}`);
                }

                const postsData = await response.json();
                setPosts(postsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, [setPosts]);

    return (
        <div>
            <NavBar/>
            <div className="h-fit grid grid-cols-12 gap-4 p-4 bg-gray-100">
                <div className="col-span-3">
                    <GroupSidebar groups={groups.filter(group => group.isApproved === true)}/>
                    &nbsp;
                    <NotJoinGroupSideBar groups={notJoinGroups.filter(group => group.isApproved === true)}/>
                </div>
                <div className="col-span-6">
                    <PostingArea groupID={null}/>
                    <UserPosts
                        posts={posts.filter((post) => user.friends.includes(post.author._id) || post.author._id === user.id || user.groups.includes(post.groupId))}
                        setPosts={setPosts}/>
                </div>
                <div className="col-span-3">
                    <FriendSidebar friends={friendsInfo}/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;