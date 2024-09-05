import React, {useState, useEffect, useContext} from "react";
import ReactionButton from './ReactionButton';
import CommentButton from './CommentButton';
import {UserContext} from "../App";
import {Link} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ListPopup from "./ListPopUp";

const UserPosts = ({ posts, setPosts }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [menuVisible, setMenuVisible] = useState(null); // Track visibility of menus

    const [editingPostId, setEditingPostId] = useState(null); // Track the post being edited
    const [editContent, setEditContent] = useState("");

    const toggleMenu = (postId) => {
        setMenuVisible((prevState) => (prevState === postId ? null : postId));
    };

    const handleEdit = (postId, currentContent) => {
        setEditingPostId(postId); // Set the post ID being edited
        setEditContent(currentContent); // Initialize with current post content
    };

    const handleCancelEdit = () => {
        setEditingPostId(null); // Reset the editing post ID
        setEditContent(''); // Clear the content of the editor
    };

    const handleDelete = async (postId) => {
        try {
            const token = localStorage.getItem("token");
        
            const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            //   'Content-Type': 'application/json' // Add Content-Type header if needed
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

            const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ content: editContent }),
            });

            if (!response.ok) {
                throw new Error(`Failed to save changes: HTTP error! status: ${response.status}`);
            }

            // Update the post content in the state
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, content: editContent } : post
                )
            );

            setEditingPostId(null); // Exit editing mode
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    useEffect(() => {
        // Fetch posts on component mount
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');

                const url = `http://localhost:5000/api/posts`;

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

    if (posts.length === 0) return <p className='text-center'>No posts</p>;

return (
    <div className="mt-4">
        {posts.length > 0 ? (
            posts.map((post) => {
                // Calculate total reactions
                const totalReactions = (
                    (post.reactions?.like?.length || 0) +
                    (post.reactions?.love?.length || 0) + 
                    (post.reactions?.funny?.length || 0) +
                    (post.reactions?.sad?.length || 0) +
                    (post.reactions?.angry?.length || 0)
                );

                const totalComments = post.comments?.length || 0;

                const isEditing = editingPostId === post._id;

                return (
                    <div key={post._id} className="mt-4 h-200 border rounded shadow-sm bg-white">
                        <div className='p-4'>
                            <div className='flex items-center'>
                                <img
                                    src={post.author.avatar}
                                    alt={`Avatar of ${post.author?.username}`}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <Link to={`/friend/${post.author._id}`} state={{friendProfile: post.author}} className={'no-underline hover:underline'}>{post.author?.username}</Link>
                                    <div className="text-sm text-gray-500">
                                        <p>{new Date(post.timestamp).toLocaleString()}</p>
                                    </div>
                                </div>
                                
                                <div>Public</div>

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
                                type="like" // Specify the type for the ReactionButton
                                onReaction={(reactionType) =>
                                    console.log(reactionType) // Show to Test
                                }
                            />
                            {/* <CommentButton comments={post.comments} /> */}
                            <CommentButton
                                postId={post._id} // Pass the post ID to CommentButton
                                onNewComment={(newComments) => {
                                    // Update the post's comments with the new comments array
                                    setPosts((prevPosts) =>
                                    prevPosts.map((p) =>
                                        p._id === post._id ? { ...p, comments: newComments } : p
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
};

export default UserPosts;
