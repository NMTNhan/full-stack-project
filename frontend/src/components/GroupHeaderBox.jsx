import React from 'react';
import "../styles/GroupHeaderBox.css";
import {Link} from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../App';

const GroupHeaderBox = ({ group }) => {
    const { user } = useContext(UserContext);
    if (!group) return null;
    console.log("User in GroupHeaderBox:", user);

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
                            <Link to={`/group/${group._id}`} className="text-blue-500 hover:text-blue-700">{group.visibility} Group</Link>
                            &nbsp; | &nbsp;
                            <Link to={`/members/${group._id}`} className="text-blue-500 hover:text-blue-700" state={{group: group}}>{group.numberOfMembers} Members</Link>
                            &nbsp; | &nbsp;
                            <Link to={`/aboutus/${group._id}`} className="text-blue-500 hover:text-blue-700" state={{group: group}}>About Us</Link>
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default GroupHeaderBox;