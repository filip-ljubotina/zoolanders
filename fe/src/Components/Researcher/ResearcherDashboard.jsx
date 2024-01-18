import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import "../General/Dashboard.css";
import ActionDetails from "./ActionDetails";
import Actions from "./Actions";

const ResearcherDashboard = ({ onLogout }) => {
  ResearcherDashboard.propTypes = {
    onLogout: PropTypes.func,
  };
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard/researcher/actions" />}
        />
        <Route path="/actions" element={<Actions onLogout={onLogout} />} />
        <Route
          path="/action-details/:id"
          element={<ActionDetails onLogout={onLogout} />}
        />
      </Routes>
    </div>
  );
};

export default ResearcherDashboard;
