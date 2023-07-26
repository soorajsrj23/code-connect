import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navbar from '../Components/Navbar/NavBar';
import Profile from '../Components/Profile/Profile';
import CurrentUserPosts from '../Pages/CurrentUserPosts';
import '../Styles/UserDashBoard.css';

const UserDashboard = () => {
  return (
    <div className='userParent'>
      <Navbar />
      <Container fluid>
        <Row>
          <Col md="3" lg="3" style={{ marginTop: '200px', minHeight: '400px' }}>
            <Profile />
          </Col>
          <Col md="9" lg="9" style={{ marginTop: '200px' }}>
            <CurrentUserPosts />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;
