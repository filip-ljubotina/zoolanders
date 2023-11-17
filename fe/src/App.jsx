import './App.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/General/Dashboard'


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <div>
                  <Login onLoginSuccess={handleLoginSuccess} />
                </div>
              )
            }
          />
          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <div>
                  <Register/>
                </div>
              )
            }
          />
          <Route
            path="/dashboard/*"
            element={
              isLoggedIn ? <Dashboard onLogout={handleLogout}/> : <Navigate to="/login" />
            }
          />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
