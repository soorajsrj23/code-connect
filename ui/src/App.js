import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';

import EditProfile from './Pages/EditProfile';
import AddPost from './Components/Posts/AddPost';

import ViewPosts from './Components/Posts/ViewPosts';
import UserDashBoard from './Pages/UserDashBoard';
import CreateCommunity from './Components/Community/CreateCommunity';
import UserProvider from './Components/Context/UserContext';

import UserSearch from './Components/Search/UserSearch';

import CommunityListComponent from './Components/Community/CommunityListComponent';
import TechNews from './Components/News/TechNews'
import Chat from './Components/Community/Chat'


import './App.css'
function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<UserDashBoard />} />
          <Route path="profile/update" element={<EditProfile />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="view-post" element={<ViewPosts />} />
          <Route path="create-community" element={<CreateCommunity />} />
          <Route exact path="/communities" element={<CommunityListComponent/>} />
          
          <Route path="chat" element={<Chat/>} />
          <Route path="/search" element={<UserSearch />} />
          <Route path="news" element={<TechNews />} />
          
        

        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
