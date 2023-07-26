import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './ContinueAsOption.css'; // Import the custom CSS file for styling
import { useNavigate } from 'react-router-dom';

const UserType = () => {
   const history=useNavigate()

   const MoveToDeveloperSignUp=()=>{
    history('/signup')
   }
   const MoveToCompanySignUp=()=>{
    history('/signup')
   }


  return (
    <Container className="user-type-container" fluid>
         <h2>Continue As...</h2>
      <Row className="justify-content-center align-items-center">
       
        <Col xs="auto">
         <div className='developer' onClick={MoveToDeveloperSignUp}>
            <p className='titleOfDeveloper'>I'm Developer <br/>looking for opportunity</p>
         </div>
        </Col>
        <Col xs="auto">
          <div className='company' onClick={MoveToCompanySignUp}>
              <p className='titleOfCompany'>A company <br/> hiring for projects</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserType;
