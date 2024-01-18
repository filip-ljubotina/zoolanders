import LogoutIcon from "@mui/icons-material/Logout";
import { Box, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import RoleService from "../../services/RoleService";
import TokenService from "../../services/TokenService";
import sky_photo from "../Assets/sky.png";
import "./Topbar.css";

const Topbar = ({ title, onLogout }) => {
  Topbar.propTypes = {
    title: PropTypes.string,
    onLogout: PropTypes.func.isRequired,
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    TokenService.removeToken();
    RoleService.removeRole();
    onLogout();
    navigate("/login");
  };

  return (
    <Box>
      <Box
        style={{ backgroundImage: `url(${sky_photo})` }}
        display="flex"
        justifyContent="space-between"
        flexDirection="row-reverse"
      >
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
      <h1 className="dashboard-header">{title}</h1>
    </Box>
  );
};

export default Topbar;
