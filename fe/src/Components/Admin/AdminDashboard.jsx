import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import "../General/Dashboard.css";
import Requests from "./Requests";
import Users from "./Users";

const AdminDashboard = ({ onLogout }) => {
  AdminDashboard.propTypes = {
    onLogout: PropTypes.func,
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/admin/users" />} />
        <Route path="/users" element={<Users onLogout={onLogout} />} />
        <Route path="/requests" element={<Requests onLogout={onLogout} />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
