import {useEffect, useState} from "react";

export const AddFriendButton = ({ friendID, userID }) => {
    const [isAdded, setIsAdded] = useState(false);
    const [isSentFriendRequest, setIsSentFriendRequest] = useState(false);

    useEffect(() => {
        checkIsSentFriendRequest();
        console.log('Is sent request: ', isSentFriendRequest);
    }, []);

    const checkIsSentFriendRequest = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/notifications/check/${userID}/${friendID}`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setIsSentFriendRequest(true);
                } else {
                    setIsSentFriendRequest(false);
                }
            } else {
                throw new Error('Failed to check if the friend request is sent');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddFriend = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/notifications/create/${friendID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({senderID: `${userID}`, type: 'Friend Request'})
            });
            if (response.ok) {
                console.log('Add friend successfully');
                setIsAdded(true);
            } else {
                throw new Error('Failed to add friend');
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (isSentFriendRequest) {
        return (
            <button
                className="bg-emerald-300 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg m-3">
                Request Sent
            </button>
        )
    } else {
        if (isAdded) {
            return (
                <button
                    className="bg-emerald-300 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg m-3">
                    Added
                </button>
            )
        } else {
            return (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg m-3"
                    onClick={() => handleAddFriend()}>
                    Add Friend
                </button>
            )
        }
    }
}