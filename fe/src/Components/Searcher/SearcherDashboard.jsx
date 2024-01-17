import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import "../General/Dashboard.css";
import Action from "./Action";

const SearcherDashboard = ({ onLogout }) => {
  SearcherDashboard.propTypes = {
    onLogout: PropTypes.func,
  };
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard/searcher/action" />}
        />
        <Route path="/action" element={<Action onLogout={onLogout} />} />
      </Routes>
    </div>
  );
};

export default SearcherDashboard;
