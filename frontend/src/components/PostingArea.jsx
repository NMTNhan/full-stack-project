import React, { useState } from 'react';

const PostingArea = ({ onImageUpload }) => {
  const [post, setPost] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      if (onImageUpload) {
        onImageUpload(file); // Call the parent component's handler with the selected file
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Posting: ${post}`);
    setPost('');
  };

  return (
    <div className="p-4 border">
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
