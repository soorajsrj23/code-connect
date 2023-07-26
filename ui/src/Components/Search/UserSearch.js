import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useNavigate } from 'react-router-dom';
import './UserSearch.css';
const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const history = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:4000/current-user', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.log('Error fetching current user:', error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/search', { name: searchQuery });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    try {
      const response = await axios.get(`http://localhost:4000/api/search?name=${value}`);
      setNameSuggestions(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchQuery(suggestion);
    setNameSuggestions([]);

    try {
      const response = await axios.get(`http://localhost:4000/api/users/${suggestion}`);
      setSearchResults([response.data]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChatClick = (userId) => {
    const rid = userId;
    const currentUserId = currentUser._id;
    console.log("reciverId is"+rid)
    history('/chat',{state:{recieverId:rid,senderId:currentUserId}}) 
  };

  return (
    <div className='mainSearch'>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Enter user name"
        className='search-input'
      />

      {nameSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {nameSuggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)} className="suggestion-item" >
              {suggestion}
            </li>
          ))}
        </ul>
      )}


<div className="search-results">
      {searchResults.map((user) => (
        <div className="search-result-item" key={user._id}>
          <img
          
          src={`data:${user.image.contentType};base64,${btoa(
            new Uint8Array(user.image.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          )}`}
          
          alt="Profile" className="profile-image" />
          <h3>{user.name}</h3>
          <p hidden>{user._id}</p>
          <button onClick={() => handleChatClick(user._id)}>Chat</button>
        </div>
      ))}
      <div>
      </div>
  
          {currentUser ? (
            <div>
              <p hidden>ID: {currentUser._id}</p>
            </div>
          ) : (
            <div>Loading... </div>
          )}
     
      </div>
    </div>
  );
};

export default UserSearch;
