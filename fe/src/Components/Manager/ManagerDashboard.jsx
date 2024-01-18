import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import "../General/Dashboard.css";
import AddSearchers from "./AddSearchers";
import Requests from "./Requests";

const ManagerDashboard = ({ onLogout }) => {
  ManagerDashboard.propTypes = {
    onLogout: PropTypes.func.isRequired,
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard/manager/addUsers" />}
        />
        <Route
          path="/addUsers"
          element={<AddSearchers onLogout={onLogout} />}
        />
        <Route path="/requests" element={<Requests onLogout={onLogout} />} />
      </Routes>
    </div>
  );
};

export default ManagerDashboard;
