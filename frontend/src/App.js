import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import React, { useState, useEffect, createContext } from 'react';
import NewEvent from './pages/crud-events/NewEvent.jsx';
import ViewEvent from './pages/crud-events/ViewEvent.jsx';
import Home from './pages/Home.jsx';
import EditEvent from './pages/crud-events/EditEvent.jsx';
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
import Favourites from './pages/Favourites.jsx';
import Footer from './components/Footer.jsx';
import About from './pages/About.jsx';


/*!
 * Events-Site Project
 * Copyright (c) 2024 Eli eli770440@gmail.com.com
 * Licensed under the MIT License
 */

// Create context
export const GeneralContext = createContext();


function App() {

  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const [loginC, setLoginC] = useState(false);
  const savedIsDark = localStorage.getItem('isDark') === 'true';
  const [isDark, setIsDark] = useState(savedIsDark);
  const [apiData, setApiData] = useState();


  // Dark Mode
  useEffect(() => {
    localStorage.setItem('isDark', isDark);
  }, [isDark]);



  // -- Token --

  // Check if token expired
  const isTokenExpired = () => {
    const expDate = localStorage.getItem("expDate");
    if (!expDate) return true;
    return Date.now() > expDate;
  };

  // Check if 15 minutes passed since last reminder
  const isReminderTimeElapsed = () => {
    const lastReminder = localStorage.getItem("lastLoginReminder");
    if (!lastReminder) return true; // In first time

    const halfHour = 30 * 60 * 1000;
    return Date.now() - parseInt(lastReminder, 10) > halfHour;
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

    setTimeout(() => {
      controlLoginC(); // In first time
    }, 15);

    const intervalId = setInterval(() => {
      controlLoginC();

    }, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);


  // Check if the token expired and if so Ask to Login every 15 minutes
  useEffect(() => {
    localStorage.setItem('loading', loading);
  }, []);




  return (

    <GeneralContext.Provider value={{ apiData, setApiData, setLoading, setLoginC, token, setToken, isDark, setIsDark }}>

      <div className="App">
        <NavbarC />

        <div>


          {/* Routes definition */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/new-event" element={<NewEvent />} />
            <Route path="/view-event" element={<ViewEvent />} />
            <Route path="/view-date" element={<ViewDate />} />
            <Route path="/edit-event" element={<EditEvent />} />
            <Route path='/my-events' element={<MyEvents />} />
            <Route path='/results' element={<Results />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logIn' element={<LogIn />} />
            <Route path='/user-management' element={<UserManagement />} />
            <Route path='/edit-user' element={<EditUser />} />
            <Route path='/favourites' element={<Favourites />} />

          </Routes >

          {loginC &&
            <LogInC />
          }

          {loading && <Loader />}


          <Footer />
          <div>

          </div>
        </div>
      </div>

    </GeneralContext.Provider>

  );
}

export default App;
