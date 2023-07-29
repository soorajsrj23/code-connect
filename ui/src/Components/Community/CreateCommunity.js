import React, { useState } from 'react';
import './CreateCommunity.css'
import axios from 'axios';
import { Container, Form, FormGroup, Label, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import SmallNavbar from '../Navbar/SmallNavbar';

const CreateCommunity = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);


  const history=useNavigate();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleIconChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIcon(selectedFile);
      const objectURL = URL.createObjectURL(selectedFile);
      setSelectedImage(objectURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('icon', icon);

      const response = await axios.post('http://localhost:4000/community', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:localStorage.getItem('token')
        },
      });
      console.log(response.data);
      history('/communities')
      // Handle success response
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    
   
    <Container fluid className='Main-Container'>
       <SmallNavbar />
      <div className="community-form">
        <h2 className='heading-create'>Create Community</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name:</Label>
            <input type="text" value={name} onChange={handleNameChange} />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description:</Label>
            <input type="text" value={description} onChange={handleDescriptionChange} />
          </FormGroup>
          <FormGroup>
            <Label for="icon">Icon:</Label>
            <div className="custom-file-input">
              <input type="file" id="icon" onChange={handleIconChange} />
              <label htmlFor="icon">
                {icon ? (
                  <span>Selected File: {icon.name}</span>
                ) : (
                  <span><i class="bi bi-image-fill"></i></span>
                )}
              </label>
            </div>
            
          </FormGroup>
          {selectedImage && (
            <div className="community-info">
              <img src={selectedImage} alt="Selected Community Icon" className="selected-image" />
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          )}
          <br />
          <Button type="submit" color="primary">Create</Button>
        </Form>
      </div>
    </Container>

  );
};

export default CreateCommunity;
