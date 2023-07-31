import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
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
import Chat from './Components/Chat/Chat'
import QuoteComponent from './Components/Quotes/QuoteComponent'
import './App.css'
import SmallNavbar from './Components/Navbar/SmallNavbar';
import ContinueAsOption from './Components/ContinueAsOption/ContinueAsOption';
import CompanySignUp from './Components/SignUp/CompanySignUp';
import CompanyLogin from './Components/Login/CompanyLogin'
import CompanyDashBoard from './Pages/CompanyDashBoard';
import JobPost from './Components/JobPost/JobPost';
import AppliedJobs from './Components/AppliedJobs/AppliedJobs';
import CompanyUpdateUserView from './Components/CompanyUpdateUserView/CompanyUpdateUserView'


function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
        <Route exact path="/" element={<ContinueAsOption />} />
        <Route exact path="/company-signup" element={<CompanySignUp />} />
        <Route exact path="/company-login" element={<CompanyLogin />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<UserDashBoard />} />
          <Route path="company-dashboard" element={<CompanyDashBoard />} />

          <Route path="profile/update" element={<EditProfile />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="view-post" element={<ViewPosts />} />
          <Route path="create-community" element={<CreateCommunity />} />
          <Route exact path="/communities" element={<CommunityListComponent/>} />
          
          <Route path="chat" element={<Chat/>} />
          <Route path="/search" element={<UserSearch />} />
          <Route path="news" element={<TechNews />} />
          <Route path="quote" element={<QuoteComponent/>} />
          <Route path="jobs" element={<JobPost/>} />
          <Route path="applied-jobs" element={<AppliedJobs/>} />
          <Route path="view-company-update" element={<CompanyUpdateUserView/>} />


          <Route path="navbar" element={<SmallNavbar/>} />
          
        

        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
