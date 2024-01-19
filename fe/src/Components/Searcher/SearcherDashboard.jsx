import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import "../General/Dashboard.css";
import UserInfo from "../General/UserInfo";
import Action from "./Action";

const SearcherDashboard = ({ onLogout }) => {
  SearcherDashboard.propTypes = {
    onLogout: PropTypes.func.isRequired,
  };
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard/searcher/action" />}
        />
        <Route path="/action" element={<Action onLogout={onLogout} />} />
        <Route
          path="/userInfo"
          element={
            <UserInfo
              categories={[
                { title: "Akcija", link: "/action" },
                { title: "Moji podaci", link: "/userInfo" },
              ]}
              user="searcher"
              onLogout={onLogout}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default SearcherDashboard;
