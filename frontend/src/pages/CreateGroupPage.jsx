import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateGroupPage.css';

function CreateGroupPage() {
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState('Public');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    // New function to handle group creation with pending approval
    const createGroup = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/groups/creategroup', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,  // Token from localStorage
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: groupName, description, visibility })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create group');
            }
    
            setSuccessMessage('Group created and is pending admin approval');
            setError(null);
        } catch (error) {
            setError(error.message);
            setSuccessMessage(null);
        }
    };
    

    // Handle form submission to trigger group creation
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent default form submission
        createGroup();  // Call the createGroup function
    };

    return (
        <div className="createGroupContainer">
            <h1 className='headerH1'>Create New Group</h1>
            <div className='headerLine'>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="groupName">Group Name</label>
                    <input
                        type="text"
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="visibility">Visibility</label>
                    <select
                        id="visibility"
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                    >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <div className='buttonContainer'>
                    <button 
                        className='returnButton' 
                        onClick={() => navigate('/homepage')}
                    >
                        Go Back to Homepage
                    </button>
                    <button 
                        type="submit" 
                        className='submitButton'
                    >
                        Create Group
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateGroupPage;