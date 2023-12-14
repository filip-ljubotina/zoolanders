import { Routes, Route } from "react-router-dom";
import './ManagerDashboard.css'
import Sidebar from './Sidebar'
import PropTypes from "prop-types"
import AddSearchers from './AddSearchers'
import Requests from './Requests'


const ManagerDashboard = ({onLogout}) => {
  ManagerDashboard.propTypes = {
    onLogout: PropTypes.func
  }
  return (
    <div>
      <Routes>
        <Route path = "/" element={<Sidebar onLogout={onLogout} />} />
        <Route path = "/addUsers" element={<AddSearchers onLogout={onLogout} />} />
        <Route path = "/requests" element={<Requests onLogout={onLogout} />} />
      </Routes>
    </div>
    
  )
}

export default ManagerDashboard