import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data
    axios
      .get('http://localhost:4000/profile', {
        headers: {
          Authorization: localStorage.getItem('token'), // Send the JWT token for authentication
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []);

  const moveToEditProfile = () => {
    navigate('update');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="profile-container" fluid>
      <Row>
        <Col xs={12} md={4} sm={4} lg={12} >
          <div className="profile-info">
            <div className="profile-image-wrapper">
              <img
                src={`data:${user.image.contentType};base64,${user.image.data}`}
                alt="Profile"
                className="profile-image"
              />
            </div>
            <div className="profile-details">
              <h3 className="profile-name">{user.name}</h3>
              <p className="profile-bio">{user.bio}</p>
              <p className="profile-bio">{user.email}</p>
              <p className="profile-bio">{user.phone}</p>
            </div>
          </div>
        </Col>
        <Col xs={12} md={8} lg={12}>
          <button onClick={moveToEditProfile} className="edit-profile-button">
            Edit Profile
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
