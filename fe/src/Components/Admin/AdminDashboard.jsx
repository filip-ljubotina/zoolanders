import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import "../General/Dashboard.css";
import UserInfo from "../General/UserInfo";
import Requests from "./Requests";
import Users from "./Users";

const AdminDashboard = ({ onLogout }) => {
  AdminDashboard.propTypes = {
    onLogout: PropTypes.func.isRequired,
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/admin/users" />} />
        <Route path="/users" element={<Users onLogout={onLogout} />} />
        <Route path="/requests" element={<Requests onLogout={onLogout} />} />
        <Route
          path="/userInfo"
          element={
            <UserInfo
              onLogout={onLogout}
              categories={[
                { title: "Korisnici", link: "/users" },
                { title: "Zahtjevi", link: "/requests" },
                { title: "Moji podaci", link: "/userInfo" },
              ]}
              user="admin"
            />
          }
        />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
