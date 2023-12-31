import React, { useState } from 'react';
import { NavItem,NavLink,Nav } from 'reactstrap';
import './SideMenu.css'
import AddJobPost from '../Components/SideMenuComponents/AddJobPost';
import CurrentCompanyJobPost from '../Components/SideMenuComponents/CurrentCompanyJobPost';
import AddCompanyUpdates from '../Components/SideMenuComponents/AddCompanyUpdates'
import EditPostedjob from '../Components/SideMenuComponents/EditPostedJobs';
import CompanyProfile from '../Components/Profile/CompanyProfile';

const SideMenu = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleMenuItemClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'postJob':
        return <div><AddJobPost/></div>; // Replace with your Post a Job component
      case 'viewJobs':
        return <div><CurrentCompanyJobPost/></div>; // Replace with your View Posted Jobs component
      case 'recruiters':
        return <div><AddCompanyUpdates/></div>; // Replace with your Recruiters component
      case 'checkMail':
        return <div><EditPostedjob/></div>; // Replace with your Check Mail component
      default:
        return <div><CompanyProfile/></div>;
    }
  };

  return (
    <div className="parent-side-menu">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="side-menu">
              <Nav vertical>
                <NavItem>
                  <NavLink href="#" onClick={() => handleMenuItemClick('postJob')} className="menu-item">
                    Post a Job
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={() => handleMenuItemClick('viewJobs')} className="menu-item">
                    View Posted Jobs
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={() => handleMenuItemClick('recruiters')} className="menu-item">
                    Add Company Update
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={() => handleMenuItemClick('checkMail')} className="menu-item">
                    Edit Posted job
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          <div className="col-md-9">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
