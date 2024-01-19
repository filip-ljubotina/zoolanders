import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import * as React from "react";
import ApiService from "../../services/ApiService";
import Sidebar from "../General/Sidebar";
import Topbar from "../General/Topbar";

const Searchers = ({ onLogout }) => {
  Searchers.propTypes = {
    onLogout: PropTypes.func.isRequired,
  };
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await ApiService.get(
        "/wildTrack/manager/getAllSearchersInStation"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching searchers table:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="users">
      <Sidebar
        categories={[
          { title: "Moja postaja", link: "/searchers" },
          { title: "Dodavanje tragača", link: "/addUsers" },
          { title: "Zahtjevi istraživača", link: "/requests" },
          { title: "Moji podaci", link: "/userInfo" },
        ]}
        user="manager"
      />
      <div className="usersContainer">
        <Topbar title="Pregled članova postaje" onLogout={onLogout} />
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
            }}
          >
            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => {
                return row.searcherId;
              }}
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

const columns = [
  { field: "searcherId", headerName: "ID", minWidth: 50, flex: 0.5 },
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
  {
    field: "qualification",
    headerName: "Osposobljenje",
    minWidth: 150,
    flex: 1,
    renderCell: ({ row: { qualification } }) => {
      return (
        <div>
          {qualification === "FOOT" && <a>Pješice</a>}
          {qualification === "DRONE" && <a>Dron</a>}
          {qualification === "CAR" && <a>Automobil</a>}
          {qualification === "CROSS_MOTOR" && <a>Cross Motor</a>}
          {qualification === "BOAT" && <a>Brod</a>}
          {qualification === "HELICOPTER" && <a>Helikopter</a>}
        </div>
      );
    },
  },
];

export default Searchers;
