import React, {useContext, useState} from "react";
import ReactionButton from './ReactionButton';
import CommentButton from './CommentButton';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ListPopup from "./ListPopUp";
import {Link} from "react-router-dom";
import {UserContext} from "../App";


const UserPosts = ({ posts, setPosts }) => {
    const [error, setError] = useState(null);
    const [menuVisible, setMenuVisible] = useState(null); // Track visibility of menus
    const [editingPostId, setEditingPostId] = useState(null); // Track the post being edited
    const [editContent, setEditContent] = useState("");
    const [visibility, setVisibility] = useState("");

    const { user } = useContext(UserContext)
    
    const toggleMenu = (postId) => {
        setMenuVisible((prevState) => (prevState === postId ? null : postId));
    };

    const handleEdit = (postId, currentContent, currentVisibility) => {
        setEditingPostId(postId); // Set the post ID being edited
        setEditContent(currentContent); // Initialize with current post content
        setVisibility(currentVisibility || '');
    };

    const handleCancelEdit = () => {
        setEditingPostId(null); // Reset the editing post ID
        setEditContent(''); // Clear the content of the editor
        setVisibility('');}
    ;
    const handleVisibilityChange = (postId, newVisibility) => {
        setVisibility(newVisibility);
    };

    const handleDelete = async (postId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json' // Add Content-Type header if needed
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete post: HTTP error! status: ${response.status}`);
            }

            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    const handleSaveEdit = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const updateData = {
                content: editContent,
                visibility: visibility,
            };

            const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                throw new Error(`Failed to save changes: HTTP error! status: ${response.status}`);
            }

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, content: editContent, visibility: visibility } : post
                )
            );

            setEditingPostId(null);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    //Create notification for the post's author when suer reaction on their post.
    const createNotification = async ( postId ) => {
        try {
            const response = await fetch(`http://localhost:5000/api/notifications/create/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({senderID: `${user.id}`, type: 'New Reaction Added', message: `${user.username} react on your post`})
            });
            if (response.ok) {
                console.log('Add reaction successfully');
            } else {
                throw new Error('Failed to add comment');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onReaction = async (postId, reactionType) => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/reactions/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ type: reactionType }),
            });

            if (!response.ok) {
                let queuedReactions = JSON.parse(localStorage.getItem('queuedReactions')) || [];
                queuedReactions.push({
                    url: `http://localhost:5000/api/posts/reactions/${postId}`,
                    method: 'PUT',
                    body: { type: reactionType },
                });
                localStorage.setItem('queuedReactions', JSON.stringify(queuedReactions));
            }

            const updatedPost = await response.json();
            setPosts((prevPosts) =>
                prevPosts.map((post) => (post._id === postId ? updatedPost : post))
            );
            await createNotification(postId)
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <div className="mt-4">
            {posts.length > 0 ? (
                posts.map((post) => {
                    // Calculate total reactions
                    const totalReactions = (
                        (post.like?.length || 0) +
                        (post.love?.length || 0) +
                        (post.funny?.length || 0) +
                        (post.sad?.length || 0) +
                        (post.angry?.length || 0)
                    );

                    let type =''; // Initialize type with an empty string
                    if (post.like.includes(user.id)) {
                        type = 'like';
                    } else if (post.love.includes(user.id)) {
                        type = 'love';
                    } else if (post.funny.includes(user.id)) {
                        type = 'funny';
                    } else if (post.sad.includes(user.id)) {
                        type = 'sad';
                    } else if (post.angry.includes(user.id)) {
                        type = 'angry';
                    }

                    const totalComments = post.comments?.length || 0;

                    const isEditing = editingPostId === post._id;

                    return (
                        <div key={post._id} className="mt-4 h-200 border rounded shadow-sm bg-white">
                            <div className='p-4'>
                                <div className='flex justify-between' >
                                    <div className='flex items-center'>
                                        <img
                                            src={post.author.avatar}
                                            alt={`Avatar of ${post.author?.username}`}
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div>
                                            <Link to={`/friend/${post.author._id}`} state={{friendProfile: post.author}}>{post.author?.username}</Link>
                                        </div>
                                    </div>
                                    {isEditing ? (
                                        <select
                                            value={visibility} // Use the state value for visibility
                                            onChange={(e) => handleVisibilityChange(post._id, e.target.value)}
                                            className="small-select"
                                        >
                                            <option value="Public">Public</option>
                                            <option value="Friends">Friends</option>
                                        </select>
                                    ) : (
                                        <div>
                                            <p>{post.visibility}</p>
                                        </div>
                                    )}
                                    <div className="relative">
                                        <i
                                            className="fas fa-ellipsis-h cursor-pointer"
                                            onClick={() => toggleMenu(post._id)}
                                        ></i>

                                        {/* Menu Pop-Up */}
                                        {menuVisible === post._id && (
                                            <ListPopup
                                                postId={post._id}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                                closePopup={() => setMenuVisible(null)}
                                            />
                                        )}
                                    </div>
                                </div>
                                {isEditing ? (
                                    <div>
                                        <textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="w-full border rounded p-2"
                                        />
                                        <div className="flex justify-end mt-2">
                                            <button
                                                onClick={() => handleSaveEdit(post._id)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="px-4 py-2 bg-gray-300 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="pt-2">{post.content}</p>
                                )}
                            </div>

                        {post.imageStatus && (
                            <img
                                src={post.imageStatus}
                                alt={post.content}
                                className="w-full h-50 object-cover"
                            />
                        )}

                            <div className='flex justify-between px-4 py-2'>
                                <div className='text-gray-500'>{totalReactions}</div>
                                {totalComments > 0 && (
                                    <div className='text-gray-500'>
                                        {totalComments >= 2
                                            ? `${totalComments} comments`
                                            : `${totalComments} comment`}
                                    </div>
                                )}
                            </div>
                            <div className='flex justify-between px-16'>
                                <ReactionButton
                                    type={type} // Specify the type for the ReactionButton
                                    onReaction={(reactionType) => onReaction(post._id, reactionType)}
                                />
                                {/* <CommentButton comments={post.comments} /> */}
                                <CommentButton
                                    post={post} // Pass the post ID to CommentButton
                                    onNewComment={(newComments) => {
                                        // Update the post's comments with the new comments array
                                        setPosts((prevPosts) =>
                                            prevPosts.map((p) =>
                                                p._id === post._id ? {...p, comments: newComments} : p
                                            )
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className='text-center'>No posts yet. Be the first to post something!</p>
            )}
        </div>
    );
}
export default UserPosts;
