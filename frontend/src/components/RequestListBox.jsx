import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MembersBox.css';
import { useParams } from 'react-router-dom';

const RequestListBox = ({ group }) => {
    const { groupID } = useParams();
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchMembers();
        fetchRequests();
    }, [groupID]); 
  
    const fetchMembers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/groups/${groupID}/members`);
        if (!response.ok) {
          throw new Error('Group not found');
        }
        const data = await response.json();
        setMembers(data);
        console.log("Members:", data); 
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchRequests = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/groups/${groupID}/requests`);
          if (!response.ok) {
            throw new Error('Group not found');
          }
          const data = await response.json();
          setRequests(data);
          console.log("Requests:", data); 
        } catch (error) {
          setError(error.message);
        }
      };

    // Function to accept a member
    const handleAccept = async (userId) => {
        try {
            await axios.post(`http://localhost:5000/api/groups/${groupID}/members/${userId}`);
            setRequests((prevRequests) => prevRequests.filter((request) => request._id !== userId)); // Remove accepted request
            fetchMembers();
            window.location.reload();
        } catch (error) {
            console.error('Error accepting member:', error.response?.data?.message || error.message);
        }
    };
    
    // Function to remove a member from the request list
    const handleRemove = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/groups/${group._id}/requests/${userId}`);
            setRequests((prevRequests) => prevRequests.filter((request) => request._id !== userId)); // Remove the request
            window.location.reload();
        } catch (error) {
            console.error('Error removing request:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="containerBox">
            <div className="requestBox">
                <h1>Request List:</h1>
                <div className="scrollableBox">
                    {requests.map((request) => (
                        <div key={request._id} className="requestContainer">
                            <p>{request.username}</p>
                            <div className='buttonBox'>
                                <button 
                                    className="acceptButton" 
                                    onClick={() => handleAccept(request._id)}
                                >
                                    Accept
                                </button>
                                &nbsp;
                                <button 
                                    className="removeButton2" 
                                    onClick={() => handleRemove(request._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RequestListBox;