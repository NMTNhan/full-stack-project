import NavBar from '../components/NavBar';
import GroupHeaderBox from '../components/GroupHeaderBox';
import MembersBox from '../components/MembersBox.jsx';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import RequestListBox from '../components/RequestListBox.jsx';

const MembersPage = () => {
  const {groupId}  = useParams(); // Get the groupId from the URL
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/groups/${groupId}`);
        if (!response.ok) {
          throw new Error('Group not found');
        }
        const data = await response.json();
        console.log(data);
        setGroup(data); 
      } catch (error) {
        setError(error.message);
      }
    };

    if (groupId) { 
      fetchGroup();
    }
    console.log('groupId:', groupId);
  }, [groupId]); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ background: '#B9D9DC' }}>
      <NavBar />
      <GroupHeaderBox group={group} /> {/* Assigning the id prop to GroupHeaderBox */}
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3"></div>
        <div className="col-span-6">
          <div className="mb-4"></div>
            <MembersBox group={group} />
            <RequestListBox group={group} />
        </div>
        <div className="col-span-3"> </div>
      </div>
    </div>
  );
};

export default MembersPage;