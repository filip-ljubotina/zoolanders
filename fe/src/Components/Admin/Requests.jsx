import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import React from "react";
import ApiService from "../../services/ApiService";
import Sidebar from "../General/Sidebar";
import Topbar from "../General/Topbar";
import Approve from "./Approve";
import "./Users.css";

const Requests = ({ onLogout }) => {
  Requests.propTypes = {
    onLogout: PropTypes.func.isRequired,
  };
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await ApiService.get(
        "/wildTrack/admin/getApprovalTable"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching request table:", error);
    }
  };

  const handleApprove = async () => {
    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching request table after approve:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

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
  const approveColumn = [
    {
      field: "approve",
      headerName: "Akcija",
      width: 150,
      renderCell: (params) => {
        return <Approve row={params.row} onApprove={handleApprove} />;
      },
    },
  ];
  return (
    <div className="users">
      <Sidebar
        categories={[
          { title: "Korisnici", link: "/users" },
          { title: "Zahtjevi", link: "/requests" },
          { title: "Moji podaci", link: "/userInfo" },
        ]}
        user="admin"
      />
      <div className="usersContainer">
        <Topbar
          title="Pristigli zahtjevi za registracijom"
          onLogout={onLogout}
        />
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
            }}
          >
            <DataGrid rows={data} columns={columns.concat(approveColumn)} />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Requests;
