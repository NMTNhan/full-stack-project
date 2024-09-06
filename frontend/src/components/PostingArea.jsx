import React, {useContext, useState} from 'react';
import {UserContext} from "../App";

const API_BASE_URL = 'http://localhost:5000';

const PostingArea = ({ onPostCreated, groupID }) => {
  const [post, setPost] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [convertedImage, setConvertedImage] = useState('');

  const { posts, setPosts } = useContext(UserContext);

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setConvertedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      convertToBase64(file)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/create`, {
        method: 'POST',
        body: JSON.stringify({
          content: post,
          image: convertedImage,
          groupID: groupID
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Extract JSON data from the response

      setPosts([data, ...posts]); // Add the new post to the beginning of the posts array
      localStorage.setItem('posts', JSON.stringify([data, ...posts])); // Store the updated posts array in local storage

      // Handle post creation response
      if (onPostCreated) {
        onPostCreated(data);
      }
      setPost('');
      setSelectedImage(null);
      setSelectedImageFile(null); // Clear selected image file
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="p-4 border bg-white rounded-lg">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="What's on your mind?"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
        
        {selectedImage && (
          <div className="mt-2">
            <img 
              src={selectedImage} 
              alt="Selected Preview"
              className="w-full h-50 object-cover"
            />
          </div>
        )}

        <div className='flex justify-between'>
          <div className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            <label htmlFor="image-upload">
              Add Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostingArea;