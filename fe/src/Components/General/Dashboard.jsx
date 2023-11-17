import { Routes, Route, Navigate } from "react-router-dom"
import RoleService from '../../services/RoleService'
import SearcherDashboard from '../Searcher/SearcherDashboard'
import ResearcherDashboard from '../Researcher/ResearcherDashboard'
import ManagerDashboard from '../Manager/ManagerDashboard'
import AdminDashboard from '../Admin/AdminDashboard'
import PropTypes from "prop-types"

const Dashboard = ({onLogout}) => {
    Dashboard.propTypes = {
        onLogout: PropTypes.func
      }
    const userRole = RoleService.getRole();
    // const isSearcher = false
    // const isManager = false
    // const isResearcher = false
    // const isAdmin = true
    
    const isSearcher = userRole === 'SEARCHER_IN_THE_FIELD'
    const isManager = userRole === 'STATION_MANAGER'
    const isResearcher = userRole === 'RESEARCHER'
    const isAdmin = userRole === 'ADMIN'

    return (
        <Routes>
            <Route path = "/*" element={isSearcher ? <Navigate to="/dashboard/searcher" /> : <Navigate to="/dashboard/manager"/>} />
            <Route path = "/searcher/*" element={isSearcher ? <SearcherDashboard onLogout={onLogout}/> : <Navigate to="/dashboard/manager"/>} />
            <Route path = "/manager/*" element={isManager ? <ManagerDashboard onLogout={onLogout}/> : <Navigate to="/dashboard/researcher"/>} />
            <Route path = "/researcher/*" element={isResearcher ? <ResearcherDashboard onLogout={onLogout}/> : <Navigate to="/dashboard/admin"/>} />
            <Route path = "/admin/*" element={ isAdmin ? <AdminDashboard onLogout={onLogout}/> : <Navigate to="/dashboard/*" />} />
        </Routes>
    )
}

export default Dashboard
