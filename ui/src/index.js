import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ProfileProvider } from './Components/Context/ProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProfileProvider>
    <App />
   
    <ToastContainer
        position="top-right"
        autoClose={2000} 
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false} 
        draggable      
        theme="dark"
      />
       </ProfileProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
