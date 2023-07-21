import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navbar from '../Components/Navbar/NavBar';
import Profile from './Profile';
import CurrentUserPosts from '../Pages/CurrentUserPosts';
import '../Styles/UserDashBoard.css';
import SecondaryNavbar from '../Components/Navbar/SecondaryNavBar';
const UserDashboard = () => {
  return (
    <div className='userParent'>
      <Navbar />
      <SecondaryNavbar/>
      <Container fluid>
        <Row>
          <Col md="3" lg="3" style={{ marginTop: '40px' }} >
            <Profile />
          </Col>
          <Col md="9" lg="9" style={{ marginTop: '20px' }}>
            <CurrentUserPosts />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;
