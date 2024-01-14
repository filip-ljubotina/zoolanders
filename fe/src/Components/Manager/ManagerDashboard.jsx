import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import "../General/Dashboard.css";
import Sidebar from "../General/Sidebar";
import AddSearchers from "./AddSearchers";
import Requests from "./Requests";

const ManagerDashboard = ({ onLogout }) => {
  ManagerDashboard.propTypes = {
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
                { title: "Dodavanje tragača", link: "/addUsers" },
                { title: "Zahtjevi istraživača", link: "/requests" },
              ]}
              user="manager"
            />
          }
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
