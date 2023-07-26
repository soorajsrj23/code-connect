import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './NavBar.css';

const iconStyles = {
  fontSize: '24px',
};

const textStyles = {
  textAlign: 'center',
};

const UserNavbar = () => {
  return (
    <div className='NavBar'>
      <Navbar color="dark" dark expand="md" className="fixed-top">
        <NavbarBrand href="/">Code Connect</NavbarBrand>
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
            <NavLink href="/add-post">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <i className="bi bi-file-earmark-plus-fill" style={{ ...iconStyles, fontSize: '18px' }}></i>
                <p className="desktop-text" style={textStyles}>Add Post</p>
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/create-community">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <i className="bi bi-window-dock" style={{ ...iconStyles, fontSize: '18px' }}></i>
                <p className="desktop-text" style={textStyles}>Create Community</p>
              </div>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default UserNavbar;
