import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import PostingArea from '../components/PostingArea';
import UserPosts from '../components/UserPosts';
import { membersPosts } from '../model/memberPost';
import GroupHeaderBox from '../components/GroupHeaderBox';

const Group = () => {
  const {groupId}  = useParams(); // Get the groupId from the URL
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(membersPosts);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/groups/${groupId}`);
        if (!response.ok) {
          throw new Error('Group not found');
        }
        const data = await response.json();
        setGroup(data); 
      } catch (error) {
        setError(error.message);
      }
    };

    if (groupId) { 
      fetchGroup();
    }
  }, [groupId]); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!group) {
    return <div>Loading...</div>;
  }

  const DisplayPost = (content) => {
    const newPost = {
      id: posts.length + 1,
      content: content,
      author: "Current User",
      timestamp: new Date().toLocaleString(),
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div style={{ background: '#B9D9DC' }}>
      <NavBar />
      <GroupHeaderBox group={group} /> {/* Pass the entire group object */}
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3"></div>
        <div className="col-span-6">
          <PostingArea addPost={DisplayPost} />
          <UserPosts posts={posts} />
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
};

export default Group;