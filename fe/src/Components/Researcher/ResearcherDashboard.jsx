import { Routes, Route } from "react-router-dom";
import './ResearcherDashboard.css'
import Sidebar from './Sidebar'
import Actions from './Actions'
import PropTypes from "prop-types"
import ActionDetails from './ActionDetails'


const ResearcherDashboard = ({onLogout}) => {
  ResearcherDashboard.propTypes = {
    onLogout: PropTypes.func
  }
  return (
    <div>
      <Routes>
        <Route path = "/" element={<Sidebar onLogout={onLogout} />} />
        <Route path = "/actions" element={<Actions onLogout={onLogout} />} />
        <Route path="/action-details/:id" element={<ActionDetails onLogout={onLogout}/>} />
      </Routes>
    </div>
  )
}

export default ResearcherDashboard;