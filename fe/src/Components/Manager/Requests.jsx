import React from 'react'
import Sidebar from './Sidebar'
import './AddSearchers.css'
import ApiService from '../../services/ApiService';
import { Box } from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Topbar from './Topbar';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const Requests = ({onLogout}) => {
  Requests.propTypes = {
    onLogout: PropTypes.object.isRequired,
    position: PropTypes.array.isRequired, // Assuming position is an array [lat, lng]
    onMapClick: PropTypes.func.isRequired,
  };
    const [data, setData] = React.useState([]);
    const [position, setPosition] = React.useState([51.505, -0.09]);

    const fetchData = async () => {
      try {
        const response = await ApiService.get('/wildTrack/manager/getAvailableSearchers');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };
    
    const handleMapClick = (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    };

    React.useEffect(() => {
      fetchData();
    }, []);

    const columns = [
      { field: "id", headerName: "ID" , width: 100},
      {
          field: "userName",
          headerName: "Korisničko ime",
          width: 150, 
          cellClassName: "username-column--cell",
      },
      {
          field: "firstName",
          headerName: "Ime",
          width: 150,
      },
      {
          field: "lastName",
          headerName: "Prezime",
          width: 150,
      },
      {
          field: "email",
          headerName: "Email",
          width: 250,
      },
      {
          field: "role",
          headerName: "Uloga",
          width: 150,
          renderCell: ({ row: { role } }) => {
              return ( 
              <Box m="0 auto" p="5px"
                  display="flex" justifyContent="center" 
                  borderRadius="4px">
                  {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
                  {role === "admin" && <a>Admin</a>}
                  {role === "SEARCHER_IN_THE_FIELD" && <a>Tragač</a>}
                  {role === "STATION_MANAGER" && <a>Voditelj postaje</a>}
                  {role === "RESEARCHER" && <a>Istraživač</a>}
              </Box>
          );
        },
      },
    ];
  return (
    <div className='users'>
        <Sidebar />
        <div className='usersContainer'>
            <Topbar title="Pristigli zahtjevi za registracijom" onLogout={onLogout} />
            <Box m="20px"> 
                <Box m="40px 0 0 0" height="75vh" sx={{"& .MuiDataGrid-root": { border: "none", },
                                                       "& .MuiDataGrid-cell": { borderBottom: "none", },}} >
                    <DataGrid rows={data} columns={columns} />
                </Box>
                <MapContainer center={position} zoom={13} style={{ height: '300px', width: '50%' }} onClick={handleMapClick}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup>Marker Position: {position[0]}, {position[1]}</Popup>
                  </Marker>
                </MapContainer>
            </Box>
        </div>
    </div>
    
  )
}

export default Requests
