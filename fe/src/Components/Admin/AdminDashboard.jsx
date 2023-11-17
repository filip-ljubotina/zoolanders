import React from 'react'
import { Routes, Route } from "react-router-dom";
import './AdminDashboard.css'
import Sidebar from './Sidebar'
import Users from './Users'
import Requests from './Requests'

const AdminDashboard = ({onLogout}) => {
  return (
    <div>
      <Routes>
        <Route path = "/" element={<Sidebar onLogout={onLogout} />} />
        <Route path = "/users" element={<Users onLogout={onLogout} />} />
        <Route path = "/requests" element={<Requests onLogout={onLogout} />} />
      </Routes>
    </div>
    
  )
}

export default AdminDashboard