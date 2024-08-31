import React from 'react';
import "../styles/GroupHeaderBox.css";

const GroupHeaderBox = ({ group }) => {
    if (!group) return null; // Ensure group data is available

    return (
        <section className="groupHeaderBox">
            <div>
                <div className="groupPic">
                    <img className="groupPicture" src={""} alt="Group Picture" />
                </div>
                <h1 className="groupHeaderBoxTitle">
                    <span className="groupName">{group.name}</span>
                </h1>
                <div>
                    <p className="statusMember">
                        <span>
                            <a href={`/Group/${group._id}`} className="text-blue-500 hover:text-blue-700">{group.status} Group</a> 
                            &nbsp; | &nbsp;
                            <a href={`/groupmembers/${group._id}`} className="text-blue-500 hover:text-blue-700">{group.numberOfMembers} Members</a>
                            &nbsp; | &nbsp;
                            <a href={`/aboutus/${group._id}`} className="text-blue-500 hover:text-blue-700">About Us</a>
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default GroupHeaderBox;