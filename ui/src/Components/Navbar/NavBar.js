import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const UserNavbar = () => {
  return (
    <Navbar color="dark" dark expand="md" >
      <NavbarBrand href="/">Logo</NavbarBrand>
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
      </Nav>
      <Nav>
        <NavItem>
          <NavLink href="/view-post">
          <i class="bi bi-images"></i>
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default UserNavbar;
