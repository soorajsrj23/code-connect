import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve the userId from localStorage
    const storedUserId = localStorage.getItem('token');
    setUserId(storedUserId);
  }, []);

  const updateUser = (newUserId) => {
    setUserId(newUserId);
    // Update the userId in localStorage
    localStorage.setItem('token', newUserId);
  };

  return (
    <UserContext.Provider value={{ userId, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
