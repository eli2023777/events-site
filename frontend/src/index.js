import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { HashRouter as Router } from 'react-router-dom';


/*!
 * Events-Site Project
 * Copyright (c) 2024 Eli eli770440@gmail.com.com
 * Licensed under the MIT License
 */



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);


reportWebVitals();
