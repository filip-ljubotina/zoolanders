import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import "../General/Dashboard.css";
import UserInfo from "../General/UserInfo";
import AddSearchers from "./AddSearchers";
import Requests from "./Requests";
import Searchers from "./Searchers";

const ManagerDashboard = ({ onLogout }) => {
  ManagerDashboard.propTypes = {
    onLogout: PropTypes.func.isRequired,
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard/manager/searchers" />}
        />
        <Route
          path="/searchers"
          element={<Searchers onLogout={onLogout} />}
        ></Route>
        <Route
          path="/addUsers"
          element={<AddSearchers onLogout={onLogout} />}
        />
        <Route path="/requests" element={<Requests onLogout={onLogout} />} />
        <Route
          path="/userInfo"
          element={
            <UserInfo
              categories={[
                { title: "Moja postaja", link: "/searchers" },
                { title: "Dodavanje tragača", link: "/addUsers" },
                { title: "Zahtjevi istraživača", link: "/requests" },
                { title: "Moji podaci", link: "/userInfo" },
              ]}
              user="manager"
              onLogout={onLogout}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default ManagerDashboard;
