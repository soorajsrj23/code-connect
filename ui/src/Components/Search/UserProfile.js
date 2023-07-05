// components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>{user.name}</h2>
      <img src={user.profileImageURL} alt="Profile" />
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Bio: {user.bio}</p>
    </div>
  );
};

export default UserProfile;
