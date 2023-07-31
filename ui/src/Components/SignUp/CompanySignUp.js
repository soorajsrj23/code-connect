import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Label, Button } from 'reactstrap';
import './CompanySignUp.css'
import { toast } from 'react-toastify';

const CompanySignUp = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [Industry,setIndustry] = useState('');
  const [phone,setPhone] =useState('')
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSignup = () => {
    if (companyName && email && password && selectedFile) {
      const formData = new FormData();
      formData.append('companyName', companyName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', selectedFile);
      formData.append('Industry', Industry);
      formData.append('phone', phone);

      axios
        .post('http://localhost:4000/company-signup', formData)
        .then((response) => {
          console.log(response.data);
          // Reset form fields
          setCompanyName('');
          setEmail('');
          setPassword('');
          setSelectedFile(null);
          setIndustry('');
          setPhone();
          // Navigate to the next page
         toast.success('Company registered successfully');
          navigate('/company-login');
        })
        .catch((error) => {
          console.error(error);
          toast.error('An error occurred during registration');
        });
    } else {
     toast.error('Please fill in all the fields');
    }
  };

const moveTOLogin=()=>{
  navigate('/company-login');
}



  return (
    <div className="signup-container-company">
      <Container className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col md="6" className="mx-auto">
            <div className="signup-form-company p-4">
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
                  <i class="bi bi-person-bounding-box"></i>
                </div>
                  <input type="file" id="fileInput" className="fileInput" onChange={handleFileSelect} />
                </label>
              </div>
              
              <h2 className="sign-up_head">Sign Up</h2>
              <FormGroup>
                <Label for="name" className="inputsFieldName">
                 Company Name
                </Label>
                <br />
                <input type="text" id="name" className="darkInput" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
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
                Industry
                </Label>
                <br />
                <input type="text" id="bio" className="darkInput" value={Industry} onChange={(e) => setIndustry(e.target.value)} />
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
                <p>All Ready have ann Account <u onClick={moveTOLogin} >login</u></p>
              </center>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CompanySignUp;
