import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import "../General/Dashboard.css";
import Sidebar from "../General/Sidebar";
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
          element={
            <Sidebar
              categories={[
                { title: "Akcije", link: "/actions" },
                { title: "Poslani zahtjevi", link: "/requests" },
              ]}
              user="researcher"
            />
          }
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
