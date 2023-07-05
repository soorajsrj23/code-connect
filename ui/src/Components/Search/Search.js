// components/Search.js
import React, { useState } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('/search', { query });
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for users..."
      />

      <button onClick={handleSearch}>Search</button>

      {searchResults.map((user) => (
        <UserProfile key={user._id} name={user.name} />
      ))}
    </div>
  );
};

export default Search;
