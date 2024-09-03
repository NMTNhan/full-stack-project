import React from 'react';
import UserCard from "./UserCard";

const FriendSidebar = ({friends}) => {
  return (
      <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-md py-8 px-8 mt-8 ml-8 mr-8">
          <h2 className={'text-[28px] font-bold text-black mb-6 text-center'}>Friend</h2>
          <div className={'grid grid-cols-3 gap-2'}>
              {friends.map((friend) => (
                  <>
                      <UserCard key={friend.id} friend={friend}/>
                  </>
              ))}
          </div>
      </div>
  );
};

export default FriendSidebar;
