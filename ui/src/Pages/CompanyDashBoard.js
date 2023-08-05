import React from 'react'
import CompanyNavBar from '../Components/Navbar/CompanyNavBar'
import SideMenu from '../SideMenu/SideMenu'
import { Container } from 'reactstrap'
import '../Styles/CompanyDashBoard.css'

function CompanyDashBoard() {
  return (
  <div>
   
        <CompanyNavBar/>
        <Container className='parent-company-dashboard' fluid>
        <SideMenu/>
        </Container>  
        </div>
    
   
  )
}

export default CompanyDashBoard