import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import AdminSectionComponent from './AdminSectionComponent';
import DashboardListComponent from './DashboardListComponent';

const DashboardComponent = () => {

  return (
    <div>
      <Routes>

        <Route path = "/" element = {
          <div>
            <h2>Dashboard</h2> 
            <DashboardListComponent/>
          </div>
        }/>

        <Route path="/admin" element={<AdminSectionComponent />} />

      </Routes>
    </div>
  );
};

export default DashboardComponent;
