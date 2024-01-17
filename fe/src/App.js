import React, { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import DashboardComponent from "./components/DashboardComponent";
import LoginComponent from "./components/LoginComponent";
import LogoutButton from "./components/LogoutButton";
import RegistrationComponent from "./components/RegistrationComponent";

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
        <h1>WildTrack Application</h1>
        {isLoggedIn && <LogoutButton onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <div>
                  <LoginComponent onLoginSuccess={handleLoginSuccess} />
                  <p
                    onClick={() => (window.location.href = "/register")}
                    className="toggle-link"
                  >
                    Don't have an account? Register here.
                  </p>
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
                  <RegistrationComponent />
                  <p
                    onClick={() => (window.location.href = "/login")}
                    className="toggle-link"
                  >
                    Have an account? Login here.
                  </p>
                </div>
              )
            }
          />
          <Route
            path="/dashboard/*"
            element={
              isLoggedIn ? <DashboardComponent /> : <Navigate to="/login" />
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
