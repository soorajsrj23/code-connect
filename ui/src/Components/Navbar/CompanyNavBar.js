import React, { useState } from 'react';
import './NavBar.css'
const iconStyles = {
  fontSize: '20px',
  marginRight: '8px',
  marginLeft:'8px'
};

const CompanyNavBar = () => {
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
              <a className='nav-link' href='/news' onClick={hideNavItems}>
                <i className='bi bi-newspaper' style={iconStyles}></i>
                News
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/communities' onClick={hideNavItems}>
                <i className='bi bi-people-fill' style={iconStyles}></i>
                Communities
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/view-post' onClick={hideNavItems}>
                <i className='bi bi-images' style={iconStyles}></i>
                View Posts
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/jobs' onClick={hideNavItems}>
                <i className='bi bi-briefcase-fill' style={iconStyles}></i>
                jobs
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/applied-jobs' onClick={hideNavItems}>
                <i className='bi bi-journal-check' style={iconStyles}></i>
                Applied Jobs
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/view-company-update' onClick={hideNavItems}>
                <i className='bi bi-images' style={iconStyles}></i>
                Pages
              </a>
            </li>
            {/* Add other NavItems as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CompanyNavBar;
