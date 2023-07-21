import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './NavBar.css'
const UserNavbar = () => {
  return (
    <div className='NavBar'>
    <Navbar color="dark" dark expand="md" >
      <NavbarBrand href="/">Code Connect</NavbarBrand>
      <Nav className="mr-auto">
        <NavItem>
          <NavLink href="/search">
          <i class="bi bi-search"></i>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/news">
          <i class="bi bi-newspaper"></i>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/communities">
          <i class="bi bi-people-fill"></i>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/view-post">
          <i class="bi bi-images"></i>
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
    </div>
  );
};

export default UserNavbar;
