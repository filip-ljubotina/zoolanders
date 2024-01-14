import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import "../General/Dashboard.css";
import Sidebar from "../General/Sidebar";
import Requests from "./Requests";
import Users from "./Users";

const AdminDashboard = ({ onLogout }) => {
  AdminDashboard.propTypes = {
    onLogout: PropTypes.func,
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Sidebar
              categories={[
                { title: "Korisnici", link: "/users" },
                { title: "Zahtjevi", link: "/requests" },
              ]}
              user="admin"
            />
          }
        />
        <Route path="/users" element={<Users onLogout={onLogout} />} />
        <Route path="/requests" element={<Requests onLogout={onLogout} />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
