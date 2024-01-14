import { Routes, Route } from "react-router-dom";
import './SearcherDashboard.css'
import Sidebar from './Sidebar'
import Action from './Action'
import PropTypes from "prop-types"


const SearcherDashboard = ({onLogout}) => {
  SearcherDashboard.propTypes = {
    onLogout: PropTypes.func
  }
  return (
    <div>
      <Routes>
        <Route path = "/" element={<Sidebar onLogout={onLogout} />} />
        <Route path = "/action" element={<Action onLogout={onLogout} />} />
      </Routes>
    </div>  )
}

export default SearcherDashboard