import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Label, Button } from 'reactstrap';
import '../Styles/SignUp.css'

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [bio,setBio] = useState('');
  const [phone,setPhone] =useState('')
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSignup = () => {
    if (name && email && password && selectedFile) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', selectedFile);
      formData.append('bio', bio);
      formData.append('phone', phone);

      axios
        .post('http://localhost:4000/signup', formData)
        .then((response) => {
          console.log(response.data);
          // Reset form fields
          setName('');
          setEmail('');
          setPassword('');
          setSelectedFile(null);
          setBio('');
          setPhone();
          // Navigate to the next page
      //    toast.success('User registered successfully');
          navigate('/login');
        })
        .catch((error) => {
          console.error(error);
        //  toast.error('An error occurred during registration');
        });
    } else {
   //   toast.error('Please fill in all the fields');
    }
  };

  return (
    <div className="signup-container">
      <Container className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col md="6" className="mx-auto">
            <div className="signup-form p-4">
              <div className="icon-wrapper">
                {selectedFile ? (
                  <div className="selected-image-wrapper">
                    <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="selected-image" />
                    </div>
                ) : (
                  <p>add image</p>
                )}
                <label htmlFor="fileInput" className="fileInputLabel">
                  <div className='add_icon'>
                  <p>hello</p>
                </div>
                  <input type="file" id="fileInput" className="fileInput" onChange={handleFileSelect} />
                </label>
              </div>
              
              <h2 className="sign-up_head">Sign Up</h2>
              <FormGroup>
                <Label for="name" className="inputsFieldName">
                  Name
                </Label>
                <br />
                <input type="text" id="name" className="darkInput" value={name} onChange={(e) => setName(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="email" className="inputsFieldName">
                  Email
                </Label>
                <br />
                
                <input type="email" id="email" className="darkInput" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <Label for="bio" className="inputsFieldName">
                  Bio
                </Label>
                <br />
                <input type="text" id="bio" className="darkInput" value={bio} onChange={(e) => setBio(e.target.value)} />
              </FormGroup>
              <FormGroup>
  <Label for="phone" className="inputsFieldName">
    Phone
  </Label>
  <br />
  <input type="text" id="phone" className="darkInput" value={phone} onChange={(e) => setPhone(e.target.value)} />
</FormGroup>



              <FormGroup>
                <Label for="password" className="inputsFieldName">
                  Password
                </Label>
                <br />
                <input type="password" id="password" className="darkInput" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormGroup>
              <center>
                <Button type="button" className="btn btn-dark" onClick={handleSignup}>
                  Sign Up
                </Button>
              </center>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
