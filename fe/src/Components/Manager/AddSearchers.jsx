import * as React from 'react'
import Sidebar from './Sidebar'
import './AddSearchers.css'
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import ApiService from '../../services/ApiService';
import Topbar from './Topbar';
import Add from './Add'
import PropTypes from "prop-types"

//dodaje tragače postaji
const AddSearchers = ({onLogout}) => {
  AddSearchers.propTypes = {
    onLogout: PropTypes.func
  }
  const [data, setData] = React.useState([]);
  const [coordinates, setCoordinates] = React.useState({});

  const fetchData = async () => {
    try {
      const responseData = await ApiService.get('/wildTrack/manager/getAvailableSearchers');
      const responseJson = await ApiService.get('/wildTrack/manager/getCoordinatesJson');
      const data = responseData.data.map((searcher) => ({ //porapviti na be
        id: searcher.searcherId, 
        firstName: searcher.firstName,
        lastName: searcher.lastName,
        qualification: searcher.qualification,
        currentPosition: searcher.currentPosition,
      }));
      setData(data);
      setCoordinates(responseJson.data)
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const handleSave = async () => {
    try {
      fetchData();
    } catch (error) {
      console.error('Error approving row:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const addColumn = [
    {
      field: "add",
      headerName: "Dodaj tragača",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Add data={params.row} coordinates={coordinates} onSave={handleSave}/>
          </div>
        );
      },
    },
  ]; 
  
  return (
    <div className='users'>
        <Sidebar />
        <div className='usersContainer'>
            <Topbar title="Dodavanje tragača postaji" onLogout={onLogout} />
            <Box m="20px" >
                <Box m="40px 0 0 0" height="75vh" sx={{"& .MuiDataGrid-root": { border: "none", },
                                                       "& .MuiDataGrid-cell": { borderBottom: "none", },}} >
                    <DataGrid rows={data} columns={columns.concat(addColumn)} />
                </Box>
            </Box>
        </div>
    </div>
  )
}

const columns = [
  { field: "id", 
    headerName: "ID", 
    width: 100
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
];


export default AddSearchers;