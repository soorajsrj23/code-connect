import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPost.css';
import SmallNavbar from '../Navbar/SmallNavbar';

const AddPost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // State to store the image preview

  const history = useNavigate();

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setSelectedFileName(selectedFile.name);
    // Create a preview URL for the selected image
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);

    try {
      // Send a POST request to create a new post
      const response = await axios.post('http://localhost:4000/posts', formData, {
        headers: {
          Authorization: localStorage.getItem('token'), // Send the JWT token for authentication
        },
      })
      console.log(response.data);

      // Clear the form inputs after submission
      setCaption('');
      setImage(null);
      history('/view-post')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='mainParentdiv'>
<SmallNavbar/>      
      <div className='add-post-container'>
        <h2>Add Post</h2>
        <div className='add-post-container'>
          <label htmlFor="caption">Caption:</label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={handleCaptionChange}
          />
        </div>
        <div>
        <label htmlFor="fileInput" className="fileInputLabel">
                  <div className='image_icon'>
                  <i class="bi bi-file-earmark-plus-fill"></i>
                </div>
                  <input type="file" id="fileInput" className="fileInput" onChange={handleImageChange} />
                </label>
        </div>
        {/* Show the selected image preview */}
        {imagePreview && (
          <div>
            <img src={imagePreview} alt="Selected" height='50px' width='40px' className="image-preview" />
          </div>
        )}
        {/* Display the selected file name */}
        {selectedFileName && <p> {selectedFileName}</p>}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddPost;
