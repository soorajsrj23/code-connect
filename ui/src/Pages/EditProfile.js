import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/EditProfile.css';
//import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [fetchedImage, setFetchedImage] = useState('');
  const [bio,setBio]=useState('');
  const [phone,setPhone] = useState('');

  useEffect(() => {
    // Fetch user profile data
    axios
      .get('http://localhost:4000/profile', {
        headers: {
          Authorization: localStorage.getItem('token'), // Send the JWT token for authentication
        },
      })
      .then((response) => {
        const { email, name, image,bio,phone } = response.data;
        setEmail(email);
        setName(name);
        setBio(bio);
        setPhone(phone);
        if (image && image.data && image.contentType) {
          const base64Image = `data:${image.contentType};base64,${image.data}`;
          setFetchedImage(base64Image);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('phone', phone);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put('http://localhost:4000/edit-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token'), // Send the JWT token for authentication
        },
      });

      console.log(response.data);
      // Handle successful update
  //    toast.success("profile updated successfully");
    } catch (error) {
      console.error(error);
    //  toast.error(error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setFetchedImage(URL.createObjectURL(selectedImage));
  };

  return (
    <form className="dark-theme" style={{ textAlign: 'left' }} onSubmit={handleSubmit}>
     <div>
    {fetchedImage && (
      <div className='image-container'>
        <img src={fetchedImage} className='imageIn_circle' alt="Fetched" width="100" />
        <label htmlFor="file-input" className="file-input-label">
          <div className="file-icon" >
          <i className="bi bi-plus-circle-fill" style={{ fontSize: '34px', color: 'Highlight' }}></i>
          </div>
          <input id="file-input" type="file" className='file-input' onChange={handleChange} />
        </label>
      </div>
    )}
  </div>
                

  <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>



      <div>
        <label>Bio</label>
        <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>

      <div>
        <label>Phone</label>
        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>


      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      
      <br/>
      
      <Button  class="btn btn-outline-dark" type="submit">Update Profile</Button>
    </form>
  );
};

export default EditProfile;
