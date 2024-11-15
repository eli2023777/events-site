import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import React, { useState, useEffect, createContext } from 'react';
import NewEvent from './pages/NewEvent.jsx';
import ViewEvent from './pages/ViewEvent.jsx';
import Home from './pages/Home.jsx';
import EditEvent from './pages/EditEvent.jsx';
import ViewDate from './pages/ViewDate.jsx';
import Results from './pages/Results.jsx';
import NavbarC from './components/NavbarC.js';
import Register from './pages/auth/Register.jsx';
import LogIn from './pages/auth/LogIn.jsx';
import UserManagement from './pages/UserManagement.jsx';
import EditUser from './pages/users/EditUser.jsx';
import MyEvents from './pages/MyEvents.jsx';
import Loader from './components/Loader.jsx';
import LogInC from './components/LogInC.jsx';



// Create context
export const GeneralContext = createContext();


function App() {

  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const [loginC, setLoginC] = useState();
  const API = 'http://localhost:7000';

  // -- Token --
  const isTokenExpired = () => {
    const expDate = localStorage.getItem("expDate");
    if (!expDate) return true;
    return Date.now() > expDate;
  };

  // Check if 15 minutes passed since last reminder
  const isReminderTimeElapsed = () => {
    const lastReminder = localStorage.getItem("lastLoginReminder");
    if (!lastReminder) return true; // In first time

    const fifteenMinutes = 15 * 60 * 1000;
    return Date.now() - parseInt(lastReminder, 10) > fifteenMinutes;
  };

  const controlLoginC = () => {
    if (isTokenExpired() && isReminderTimeElapsed()) {
      localStorage.removeItem("token");
      localStorage.removeItem("expDate");
      setLoginC(true);
      localStorage.setItem("lastLoginReminder", Date.now().toString());
    }
  };


  // Check if the token expired and if so Ask to Login every 15 minutes
  useEffect(() => {
    controlLoginC(); // In first time

    const intervalId = setInterval(() => {
      controlLoginC();

    }, 15 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);


  // Check if the token expired and if so Ask to Login every 15 minutes
  useEffect(() => {
    localStorage.setItem('loading', loading);
  }, []);




  return (

    <GeneralContext.Provider value={{ API, setLoading, setLoginC, token, setToken }}>

      <div className="App">
        <NavbarC />

        <div>


          {/* Routes definition */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-event" element={<NewEvent />} />
            <Route path="/view-event" element={<ViewEvent />} />
            <Route path="/view-date" element={<ViewDate />} />
            <Route path="/edit-event" element={<EditEvent />} />
            <Route path='/results' element={<Results />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logIn' element={<LogIn />} />
            <Route path='/user-management' element={<UserManagement />} />
            <Route path='/edit-user' element={<EditUser />} />
            <Route path='/my-events' element={<MyEvents />} />

          </Routes >

          {loginC && <LogInC />}

          {loading && <Loader />}

          <div>

          </div>
        </div>
      </div>

    </GeneralContext.Provider>

  );
}

export default App;
