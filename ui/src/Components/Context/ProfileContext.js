import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const ProfileContext = createContext();

// Create the provider component
const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the profile data from the API when the component mounts
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await axios.get('http://localhost:4000/profile', {
        headers: {
          Authorization: localStorage.getItem('token'), // Send the JWT token for authentication
        },
      }); // Replace '/api/profile' with your actual backend API endpoint for fetching the profile
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
