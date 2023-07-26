import React, { useState } from 'react';
import CompanyProfile from './CompanyProfile';
import './ParentComponent.css';

const ParentComponent = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleShowProfile = () => {
    setShowProfile(true);

    // Scroll to the profile smoothly
    const profileElement = document.getElementById('company-profile');
    if (profileElement) {
      profileElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHideProfile = () => {
    setShowProfile(false);
  };

  return (
    <div className="parent-container">
      {!showProfile && (
        <button onClick={handleShowProfile} className="button">
          Show Company Profile
        </button>
      )}
      <div id="company-profile">
        {showProfile && (
          <div>
            <button onClick={handleHideProfile} className="button">
              Hide Company Profile
            </button>
            <CompanyProfile />
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentComponent;
