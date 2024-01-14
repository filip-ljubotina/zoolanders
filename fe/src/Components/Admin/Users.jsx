import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import * as React from "react";
import ApiService from "../../services/ApiService";
import Sidebar from "../General/Sidebar";
import Topbar from "../General/Topbar";
import Edit from "./Edit";
import "./Users.css";

const Users = ({ onLogout }) => {
  Users.propTypes = {
    onLogout: PropTypes.func,
  };
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await ApiService.get("/wildTrack/admin/getUserTable");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleSave = async () => {
    try {
      fetchData();
    } catch (error) {
      console.error("Error approving row:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const editColumn = [
    {
      field: "edit",
      headerName: "Edit user",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Edit data={params.row} onSave={handleSave} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="users">
      <Sidebar
        categories={[
          { title: "Korisnici", link: "/users" },
          { title: "Zahtjevi", link: "/requests" },
        ]}
        user="admin"
      />
      <div className="usersContainer">
        <Topbar title="Pregled korisnika" onLogout={onLogout} />
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
            }}
          >
            <DataGrid rows={data} columns={columns.concat(editColumn)} />
          </Box>
        </Box>
      </div>
    </div>
  );
};

const columns = [
  { field: "id", headerName: "ID", width: 100 },
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
        <Box
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
        >
          {role === "ADMIN" && <AdminPanelSettingsOutlinedIcon />}
          {role === "ADMIN" && <a>Admin</a>}
          {role === "SEARCHER_IN_THE_FIELD" && <a>Tragač</a>}
          {role === "STATION_MANAGER" && <a>Voditelj postaje</a>}
          {role === "RESEARCHER" && <a>Istraživač</a>}
        </Box>
      );
    },
  },
];

export default Users;
