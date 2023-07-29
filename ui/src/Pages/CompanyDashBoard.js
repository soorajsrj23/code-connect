import React from 'react'
import CompanyNavBar from '../Components/Navbar/CompanyNavBar'
import SideMenu from '../SideMenu/SideMenu'
import ParentComponent from '../Components/Profile/ParentCompanyProfile'
function CompanyDashBoard() {
  return (
    <div>
        <CompanyNavBar/>
        <ParentComponent/>
        <SideMenu/>
    
    </div>
  )
}

export default CompanyDashBoard