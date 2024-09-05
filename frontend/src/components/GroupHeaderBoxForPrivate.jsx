import React, { useContext } from 'react';
import "../styles/GroupHeaderBox.css";
import { UserContext } from '../App';

const GroupHeaderBoxForPrivate = ({ group }) => {
    const { user } = useContext(UserContext);
    if (!group) return null;

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
                            <span className="text-blue-500 hover:text-blue-700">{group.visibility} Group</span>
                            &nbsp; | &nbsp;
                            <span className="text-blue-500 hover:text-blue-700">{group.numberOfMembers} Members</span>
                            &nbsp; | &nbsp;
                            <span className="text-blue-500 hover:text-blue-700">About Us</span>
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default GroupHeaderBoxForPrivate;