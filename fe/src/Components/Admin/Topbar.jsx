import React from 'react'
import './Topbar.css'
import { useNavigate } from 'react-router-dom';
import TokenService from '../../Services/TokenService';
import RoleService from '../../Services/RoleService';
import { Box, IconButton } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import sky_photo from '../Assets/sky.png'

const Topbar = ({title, onLogout}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    TokenService.removeToken();
    RoleService.removeRole();
    onLogout();
    navigate('/login');
  };

  return (
    <Box>
      <Box style={{backgroundImage:`url(${sky_photo})`}} display="flex" justifyContent="space-between" flexDirection="row-reverse">
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
      <h1 className='dashboard-header'>{title}</h1>
    </Box>  
  )
}

export default Topbar