import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './SmallNavBar.css'
const iconStyles = {
  fontSize: '24px',
};

const textStyles = {
  textAlign: 'center',
};

const CompanyNavBar = () => {
  return (
    <div className='NavBar'>
      <Navbar color="dark" dark expand="md" className="fixed-top NavBar">
    
        <Nav className="mr-auto">
          <NavItem>
            <NavLink href="/search">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <i className="bi bi-search" style={{ ...iconStyles, fontSize: '18px' }}></i>
                <p className="desktop-text" style={textStyles}>Search</p>
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/news">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <i className="bi bi-newspaper" style={{ ...iconStyles, fontSize: '18px' }}></i>
                <p className="desktop-text" style={textStyles}>News</p>
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/communities">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <i className="bi bi-people-fill" style={{ ...iconStyles, fontSize: '18px' }}></i>
                <p className="desktop-text" style={textStyles}>Communities</p>
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/view-post">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <i className="bi bi-images" style={{ ...iconStyles, fontSize: '18px' }}></i>
                <p className="desktop-text" style={textStyles}>View Posts</p>
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/profile">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <i className="bi bi-house-fill" style={{ ...iconStyles, fontSize: '18px' }}></i>
                <p className="desktop-text" style={textStyles}>Home</p>
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <UncontrolledDropdown nav inNavbar >
              <DropdownToggle nav caret className="nav-item-container">
                <div className="nav-item-container">
                <i class="bi bi-three-dots-vertical"></i>
                </div>
              </DropdownToggle>
              <DropdownMenu right dark>
                <DropdownItem href="/create-community">
                  Create Community
                </DropdownItem>
                <DropdownItem href="/edit-profile">
                  Edit Profile
                </DropdownItem>
                <DropdownItem href="/login">
                 Log Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
      
        </Nav>
      </Navbar>
    </div>
  );
};

export default CompanyNavBar;
