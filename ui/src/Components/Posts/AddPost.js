import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddPost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);


  const history=useNavigate();

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
    <div>
      <h2>Add Post</h2>
      <div>
        <label htmlFor="caption">Caption:</label>
        <input
          type="text"
          id="caption"
          value={caption}
          onChange={handleCaptionChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddPost;
