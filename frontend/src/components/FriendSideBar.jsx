import React, {useEffect, useState} from 'react';
import UserCard from "./UserCard";

const FriendSidebar = ({ friends }) => {
    const [friendsInfo, setFriendsInfo] = useState([]);

    //Get all the friend info.
    const fetchFriendsInfo = async () => {
        try {
            const friendsData = await Promise.all(
                friends.map(async (friendId) => {
                    const response = await fetch(`http://localhost:5000/api/friends/${friendId}`);
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch friend information');
                    }
                })
            );
            setFriendsInfo(friendsData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFriendsInfo();
    }, []);



  return (
      <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-md py-8 px-8">
          <h2 className={'text-[28px] font-bold text-black mb-6 text-center'}>Friend</h2>
          <div className={'grid grid-cols-3 gap-2'}>
              {friendsInfo.map((friend) => (
                  <>
                      <UserCard key={friend.id} friend={friend}/>
                  </>
              ))}
          </div>
      </div>
  );
};

export default FriendSidebar;
