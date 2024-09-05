import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../App';
import '../styles/CreateGroupPage.css';

const NewGroupForm = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState('Public'); 
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newGroup = {
            name: groupName,
            description,
            visibility,
            adminId: user.id,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/groups/creategroup', newGroup);
            setSuccessMessage('Group created successfully!');
            setError(null); 
            setGroupName('');
            setDescription('');
            setVisibility('Public'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating group');
            setSuccessMessage(null); 
        }
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
                    <button className='returnButton' onClick={() => navigate('/homepage')}>Go Back to Homepage</button>
                    <button type="submit" className='submitButton'>Create Group</button>
                </div>
            </form>
        </div>
    );
};

export default NewGroupForm;