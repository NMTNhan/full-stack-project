import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import PostingArea from '../components/PostingArea';
import UserPosts from '../components/UserPosts';
import GroupHeaderBox from '../components/GroupHeaderBox';
import { useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import GroupHeaderBoxForPrivate from '../components/GroupHeaderBoxForPrivate.jsx';
import "../styles/Group.css";


const Group = () => {
  const { user, posts, setPosts} = useContext(UserContext);
  const {groupID}  = useParams(); 
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [sentRequest, setSentRequest] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroup();
  }, [user, groupID]); 

  const fetchGroup = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/groups/get/${groupID}`);
      if (!response.ok) {
        throw new Error('Group not found');
      }
      const data = await response.json();
      setGroup(data);
      if (data.requestList.includes(user.id)) {
        setSentRequest(true);
      }
      setError(null);
      if (data.members.includes(user.id)) {
        setIsMember(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRequest = async () => {
    try {
      await axios.post(`http://localhost:5000/api/groups/${groupID}/requests/${user.id}`);
      setSentRequest(true);
      setSuccessMessage('Request to join the group has been sent!');
      setError(null);
      await createNotification();
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error sending request. Please try again later.');
      } else {
        setError('Error sending request. Please try again later.');
      }
      setSuccessMessage(null);
    }
  };

  const createNotification = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/create/${group.admin}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({senderID: `${user.id}`, type: 'New Join Group Request', message: `${user.username} sent the join group request ${group.name}`})
      });
      if (response.ok) {
        console.log('Add group request successfully');
      } else {
        throw new Error('Failed to add group request');
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{ background: '#B9D9DC' }}>
      <NavBar />
      {group && (group.visibility === 'Public' || isMember) ? (
        <>
          <GroupHeaderBox group={group} />
          <div className={'flex place-content-center'}>
            {sentRequest && <p className="success">Request to join the group has been sent!</p> }
            {
                ((!sentRequest && !group.members.includes(user.id)))&& <div>
                <button className='returnButton' onClick={() => navigate('/homepage')}>Go Back to Homepage
                </button>
                &nbsp;
                <button onClick={handleRequest} className="requestButton">
                  Request to Join Group?
                </button>
              </div>
            }
          </div>
          <div className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-3"></div>
            <div className="col-span-6 place-items-center">
              {
                group.members.includes(user.id) ?
                    <>
                      <PostingArea groupID={`${group._id}`}/>
                      <UserPosts posts={posts.filter((post) => post.groupId === group._id)} setPosts={setPosts}/>
                    </>
                    :
                    <UserPosts posts={posts.filter((post) => post.groupId === group._id)}/>
              }
            </div>

            <div className="col-span-3"></div>
          </div>
        </>
      ) : group && !isMember ? (
          <>
            <GroupHeaderBoxForPrivate group={group}/>
            <div className="requestContainer1">
              <div>
                <h2>You cannot view this group.</h2>
                <p>This group is private, and you are not a member.</p>
                <div>
                  <div className={'flex place-content-center'}>
                    {sentRequest && <p className="success">Request to join the group has been sent!</p>}
                    {
                        ((!sentRequest && !group.members.includes(user.id))) && <div>
                          <button className='returnButton' onClick={() => navigate('/homepage')}>Go Back to Homepage
                          </button>
                          &nbsp;
                          <button onClick={handleRequest} className="requestButton">
                            Request to Join Group?
                          </button>
                        </div>
                    }
                  </div>
                </div>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
              </div>
            </div>
          </>
      ) : null}
    </div>
  );
};

export default Group;