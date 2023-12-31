import React, {  useState, useEffect } from 'react';
import axios from 'axios';
import { createContext } from 'react';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the profile data from the API when the component mounts
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await axios.get('/api/profile'); // Replace '/api/profile' with your actual backend API endpoint for fetching the profile
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
