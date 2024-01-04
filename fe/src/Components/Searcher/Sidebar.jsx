import React from 'react'
import { Link } from "react-router-dom"
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton } from '@mui/material'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import Placeholder from '../Assets/profile-placeholder.png'
import background_photo from '../Assets/login-bg.png'
import PropTypes from "prop-types"

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const [selected, setSelected] = React.useState("Home")

    

    const DisplayCategory = ({ title, to, icon, selected, setSelected }) => {
        DisplayCategory.propTypes = {
            title: PropTypes.string,
            to: PropTypes.string,
            icon: PropTypes.object,
            selected: PropTypes.string,
            setSelected: PropTypes.func
        }
        return (
            <Link to={`/dashboard/searcher${to}`}>
                <MenuItem component="div" 
                        active={selected === title} 
                        style={{color: "#72601b",}}
                        onClick={() => setSelected(title)}
                        icon={icon}>
                    {title}
                </MenuItem>
            </Link>          
        );
      };

    return (
        <Box>
            <ProSidebar style={{ height: "100vh"}} image={background_photo} collapsed={ isCollapsed }>
                <Menu>
                    <MenuItem onClick={() => setIsCollapsed(!isCollapsed)} icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                            style={{margin: "10px 0 20px 0", color: "#72601b"}}>
                        {!isCollapsed && (
                        <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                            <h2>Tragač</h2>
                        </Box>)}
                    </MenuItem>
                    {!isCollapsed && (
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img alt="profile-user" width="100px" height="100px" src={Placeholder}style={{ cursor: "pointer", borderRadius: "50%" }} />
                        </Box>
                    </Box>)}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>                        
                        <DisplayCategory title="Home" to="/" icon={<HomeOutlinedIcon />} 
                                         selected={selected} setSelected={setSelected} />
                        
                        {!isCollapsed && <h3 style={{textAlign: "center", color: "#393070"}}>Manage users</h3>}

                        <DisplayCategory title="Akcija" to="/action" icon={<PeopleOutlinedIcon />} 
                                         selected={selected} setSelected={setSelected} />
                        
                    </Box>
                    
                </Menu>
                
            </ProSidebar>
        </Box>    
    )
}

export default Sidebar