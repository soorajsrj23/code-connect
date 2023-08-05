// components/CompanyUpdates.js

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'; // Import ReactStrap components
import { toast } from 'react-toastify';

import './AddCompanyUpdates.css'; // Import the CSS file

const CompanyUpdates = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // State to store the selected image file
    const [updates, setUpdates] = useState([]);
    
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append('title', title);
          formData.append('content', content);
          formData.append('image', image); // Append the image file to the form data
    
          await axios.post('http://localhost:4000/add-company-updates', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization:localStorage.getItem('token') 
            },
          });
          setTitle('');
          setContent('');
          setImage(null); // Reset the image state
         toast.success('Added update');
        } catch (error) {
          console.error('Error adding company update:', error.message);
          toast.error(error.message);
        }
      };
    
      const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };
  return (
    <Container className="company-updates-container">
      <h1 className="heading">Company Updates</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={12} md={6}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
              />
            </FormGroup>
          </Col>
          <Col sm={12} md={6}>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                type="file"
                accept="image/*"
                id="image"
                onChange={handleImageChange}
                className="input-field"
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="content">Content</Label>
          <textarea
            type="textarea"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-area-field"
          />
        </FormGroup>
        <Button type="submit" color="primary" className="add-button">Add Update</Button>
      </Form>
      <div>
        <h2 className="sub-heading">Recent Updates</h2>
        <ul className="updates-list">
          {updates.map((update) => (
            <li key={update._id} className="update-item">
              <h3>{update.title}</h3>
              <p>{update.content}</p>
              {update.imageUrl && <img src={update.imageUrl} alt={update.title} className="update-image" />}
              <p className="date">{new Date(update.createdAt).toDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default CompanyUpdates;
