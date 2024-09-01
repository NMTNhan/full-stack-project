import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MembersBox.css';

const MembersBox = ({ group }) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/groups/${group._id}/members`);
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error.response?.data?.message || error.message);
            }
        };

        if (group._id) { 
            fetchMembers();
        }
    }, [group._id]); 

    const handleRemoveMember = async (memberId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/groups/${group._id}/members/${memberId}`);
            // Update local state to reflect the removal
            setMembers(prevMembers => prevMembers.filter(member => member._id !== memberId));
        } catch (error) {
            console.error('Error removing member:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="containerBox">
            <div className="membersBox">
                <h1>Members:</h1>
                <div className="scrollableBox">
                    {members.map((member) => (
                        <div key={member._id} className="memberContainer">
                            <p>{member.username}</p>
                            <button 
                                className="removeButton1" 
                                onClick={() => handleRemoveMember(member._id)} // Call remove function
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MembersBox;