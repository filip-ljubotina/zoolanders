import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import "../General/Dashboard.css";
import Sidebar from "../General/Sidebar";
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
          element={
            <Sidebar
              categories={[{ title: "Akcija", link: "/action" }]}
              user="searcher"
            />
          }
        />
        <Route path="/action" element={<Action onLogout={onLogout} />} />
      </Routes>
    </div>
  );
};

export default SearcherDashboard;
