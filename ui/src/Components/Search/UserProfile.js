// components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css'
const UserProfile = ({ name }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${name}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [name]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <img src={user.profileImageURL} alt="Profile" className="profile-image" />
      <div className="user-info">
        <h2 className="user-name">{user.name}</h2>
        <p className="user-email">{user.email}</p>
        <p className="user-phone">{user.phone}</p>
        <p className="user-bio">{user.bio}</p>
      </div>
    </div>
  );
};

export default UserProfile;
