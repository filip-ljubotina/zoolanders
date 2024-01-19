import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import "../General/Dashboard.css";
import UserInfo from "../General/UserInfo";
import ActionDetails from "./ActionDetails";
import Actions from "./Actions";

const ResearcherDashboard = ({ onLogout }) => {
  ResearcherDashboard.propTypes = {
    onLogout: PropTypes.func.isRequired,
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
        <Route
          path="/userInfo"
          element={
            <UserInfo
              categories={[
                { title: "Akcije", link: "/actions" },
                { title: "Moji podaci", link: "/userInfo" },
              ]}
              user="researcher"
              onLogout={onLogout}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default ResearcherDashboard;
