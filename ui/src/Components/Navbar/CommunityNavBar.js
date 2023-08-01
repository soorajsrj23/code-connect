import React, { useState } from 'react';
import './NavBar.css'
const iconStyles = {
  fontSize: '20px',
  marginRight: '8px',
  marginLeft:'8px'
};

const CommunityNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hideNavItems = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark fixed-top'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          Code Connect
        </a>
        <button className='navbar-toggler' type='button' onClick={toggleMenu}>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className={`collapse navbar-collapse  ${isMenuOpen ? 'show' : ''}`}>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='/search' onClick={hideNavItems}>
                <i className='bi bi-search' style={iconStyles}></i>
                Search
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/create-community' onClick={hideNavItems}>
                <i className='bi bi-person-fill-add' style={iconStyles}></i>
                Create Community
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/view-company-update' onClick={hideNavItems}>
                <i className='bi bi-images' style={iconStyles}></i>
                Pages
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/profile' onClick={hideNavItems}>
                <i className='bi bi-house-fill' style={iconStyles}></i>
                Home
              </a>
            </li>
            {/* Add other NavItems as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CommunityNavBar;
