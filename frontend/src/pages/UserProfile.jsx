import NavBar from "../components/NavBar";
import UserCard from "../components/UserCard";
import PostingArea from "../components/PostingArea";
import UserPosts from "../components/UserPosts";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";

export default function UserProfile() {
    const [friendsInfo, setFriendsInfo] = useState([]);
    const [posts, setPosts] = useState([]);
    const { user } = useContext(UserContext)

    // Function to add a new post
    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    useEffect(() => {
        fetchFriendsInfo();
        fetchUserPosts(); 
    }, [user.friends]);

    //Get all the friend info.
    const fetchFriendsInfo = async () => {
        try {
            const friendsData = await Promise.all(
                user.friends.map(async (friendId) => {
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

    const fetchUserPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/posts?userId=${user.id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch user posts');
            }
    
            const userPosts = await response.json();
            setPosts(userPosts);
        } catch (error) {
            console.error(error);
        }
    }
    

    return (
        <>
            <div>
                <NavBar/>
                <div className={'bg-white border-b-2 border-gray-300 border-opacity-50'}>
                    {/*Avatar*/}
                    <div >
                        <img className=" absolute rounded-full bg-red-500 ml-5 mt-44 w-40 h-40"
                             src={`${user.avatar}`}
                             alt={'img'}
                        />
                    </div>
                    {/*Cover picture*/}
                    <div>
                        <img className="object-cover w-full h-56 place-items-end justify-end"
                             src="https://png.pngtree.com/thumb_back/fh260/background/20230615/pngtree-landscape-landscape-photo-image_2902263.jpg"
                            alt={'img'}/>
                    </div>
                    <div className={'flex justify-between w-full h-32 '}>
                        <div className={'inline-block ml-48 pt-7 font-bold text-black text-4xl'}>{user.username}</div>
                    </div>
                </div>
                <div className={'h-fit bg-gray-100'}>
                    <div className={'flex w-full columns-2xs'}>
                        {/*Information and friend*/}
                        <div className={'w-1/2'}>
                            <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-md py-8 px-8 mt-8 ml-8 mr-8">
                                <h2 className={'text-[28px] font-bold text-black mb-6 text-center'}>Information</h2>
                                <div>
                                    <div className={'flex justify-between mt-4'}>
                                        <div className={'text-black font-bold'}>Name:</div>
                                        <div className={'text-black'}>{user.username}</div>
                                    </div>
                                    <div className={'flex justify-between mt-4'}>
                                        <div className={'text-black font-bold'}>Email:</div>
                                        <div className={'text-black'}>{user.email}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-md py-8 px-8 mt-8 ml-8 mr-8">
                                <h2 className={'text-[28px] font-bold text-black mb-6 text-center'}>Friend</h2>
                                <div className={'grid grid-cols-3 gap-2'}>
                                    {friendsInfo.map((friend) => (
                                        <>
                                            <UserCard key={friend.id} friend={friend}/>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={'w-full ml-3'}>
                            <div className={'grid grid-cols-1 w-11/12 m-8 rounded-xl'}>
                                <PostingArea addPost={handlePostCreated}/>
                                <UserPosts posts={posts} setPosts={setPosts}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}