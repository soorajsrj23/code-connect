import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import './SecondaryNavBar.css';

const SecondaryNavbar = () => {
  return (
    <div className='secondary-navbar'>
      <Navbar color="dark"  expand="md">
        <Nav navbar>
          <NavItem>
            <NavLink href="/add-post">
            <i class="bi bi-file-earmark-plus-fill"></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/create-community">
            <i class="bi bi-window-dock"></i>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default SecondaryNavbar;
