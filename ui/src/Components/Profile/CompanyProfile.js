import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './CompanyProfile.css'
const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data
    axios
      .get('http://localhost:4000/company-profile', {
        headers: {
          Authorization: localStorage.getItem('token'), // Send the JWT token for authentication
        },
      })
      .then((response) => {
        setCompany(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []);

  const moveToEditProfile = () => {
    navigate('update');
  };

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <Row>
        <Col xs={12} md={4} sm={4} lg={12} >
          <div className="profile-info">
            <div className="profile-image-wrapper">
              <img
                src={`data:${company.image.contentType};base64,${company.image.data}`}
                alt="Profile"
                className="profile-image"
              />
            </div>
            <div className="profile-details">
              <h3 className="profile-name">{company.companyName}</h3>
              <p className="profile-bio">{company.industry}</p>
              <p className="profile-bio">{company.email}</p>
              <p className="profile-bio">{company.phone}</p>
              <p className="profile-bio">{company._id}</p>
            </div>
          </div>
        </Col>
        <Col xs={12} md={8} lg={12}>
          <button onClick={moveToEditProfile} className="edit-profile-button">
            Edit Profile
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default CompanyProfile;
