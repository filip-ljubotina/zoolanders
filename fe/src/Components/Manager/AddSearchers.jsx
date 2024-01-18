import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import * as React from "react";
import ApiService from "../../services/ApiService";
import Sidebar from "../General/Sidebar";
import Topbar from "../General/Topbar";
import Add from "./Add";
import "./AddSearchers.css";

//dodaje tragače postaji
const AddSearchers = ({ onLogout }) => {
  AddSearchers.propTypes = {
    onLogout: PropTypes.func,
  };
  const [data, setData] = React.useState([]);
  const [coordinates, setCoordinates] = React.useState({});

  const fetchData = async () => {
    try {
      const responseData = await ApiService.get(
        "/wildTrack/manager/getAvailableSearchers"
      );
      const responseJson = await ApiService.get(
        "/wildTrack/manager/getCoordinatesJson"
      );
      const data = responseData.data.map((searcher) => ({
        //porapviti na be
        id: searcher.searcherId,
        firstName: searcher.firstName,
        lastName: searcher.lastName,
        qualification: searcher.qualification,
        currentPosition: searcher.currentPosition,
      }));
      setData(data);
      setCoordinates(responseJson.data);
    } catch (error) {
      console.error("Error fetching available searchers:", error);
    }
  };

  const handleSave = async () => {
    try {
      fetchData();
    } catch (error) {
      console.error("Error adding searcher to station:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const addColumn = [
    {
      field: "add",
      headerName: "Dodaj tragača",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Add
              data={params.row}
              coordinates={coordinates}
              onSave={handleSave}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="users">
      <Sidebar
        categories={[
          { title: "Dodavanje tragača", link: "/addUsers" },
          { title: "Zahtjevi istraživača", link: "/requests" },
        ]}
        user="manager"
      />
      <div className="usersContainer">
        <Topbar title="Dodavanje tragača postaji" onLogout={onLogout} />
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
            }}
          >
            <DataGrid rows={data} columns={columns.concat(addColumn)} />
          </Box>
        </Box>
      </div>
    </div>
  );
};

const columns = [
  { field: "id", headerName: "ID", minWidth: 50, flex: 0.5 },
  {
    field: "firstName",
    headerName: "Ime",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "lastName",
    headerName: "Prezime",
    minWidth: 150,
    flex: 1,
  },
];

export default AddSearchers;
