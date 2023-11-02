import React from 'react';
import { useNavigate } from 'react-router-dom';
import TokenService from '../services/TokenService';
import RoleService from '../services/RoleService';

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    TokenService.removeToken();
    RoleService.removeRole();
    onLogout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
