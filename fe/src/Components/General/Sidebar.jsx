import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { Box, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Menu, MenuItem, Sidebar as ProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import UserInfoService from "../../services/UserInfoService";
import background_photo from "../Assets/login-bg.png";
import Placeholder from "../Assets/profile-placeholder.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Sidebar = ({ user, categories }) => {
  Sidebar.propTypes = {
    categories: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired,
  };

  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [selected, setSelected] = React.useState("Home");

  const DisplayCategory = ({ title, to, icon, selected, setSelected }) => {
    DisplayCategory.propTypes = {
      title: PropTypes.string,
      to: PropTypes.string,
      icon: PropTypes.object,
      selected: PropTypes.string,
      setSelected: PropTypes.func,
    };
    return (
      <Link to={`/dashboard/${user}${to}`}>
        <MenuItem
          component="div"
          active={selected === title}
          style={{ color: "#72601b" }}
          onClick={() => setSelected(title)}
          icon={icon}
        >
          {title}
        </MenuItem>
      </Link>
    );
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (isCollapsed) {
      document.documentElement.style.setProperty("--content-width", "250px");
    } else {
      document.documentElement.style.setProperty("--content-width", "80px");
    }
  };

  return (
    <Box>
      <ProSidebar
        style={{
          minHeight: "100vh",
          height: "100%",
        }}
        image={background_photo}
        collapsed={isCollapsed}
      >
        <Menu>
          <MenuItem
            onClick={handleCollapse}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: "#72601b" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={handleCollapse}>
                  <MenuOutlinedIcon />
                </IconButton>
                <h2>
                  {user === "admin"
                    ? "Admin"
                    : user === "manager"
                    ? "Voditelj"
                    : user === "researcher"
                    ? "Istraživač"
                    : "Tragač"}
                </h2>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={
                    UserInfoService.getImage() !== "null"
                      ? `data:image/jpeg;base64,${UserInfoService.getImage()}`
                      : Placeholder
                  }
                  style={{ borderRadius: "50%" }}
                />
              </Box>
            </Box>
          )}
          <Box>
            {categories.map((category) => (
              <DisplayCategory
                key={category.title}
                title={category.title}
                to={category.link}
                icon={
                  category.link.includes("action") ||
                  category.link.includes("requests") ? (
                    <AssignmentIcon />
                  ) : category.link.includes("Info") ? (
                    <AccountCircleOutlinedIcon />
                  ) : (
                    <PeopleOutlinedIcon />
                  )
                }
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
