import React from 'react';
import {Link} from 'react-router-dom';
import RoleService from '../services/RoleService';


const DashboardListComponent = () => {
    const userRole = RoleService.getRole();
    const isAdmin = userRole === 'ADMIN';
  
    return (
      <div>
        {isAdmin && window.location.pathname.endsWith('/dashboard') && (
          <p>
            You have admin privileges.{' '}
            <Link to="admin" style={{ cursor: 'pointer', color: 'blue' }}>
              Go to Admin Section
            </Link>
          </p>
        )}
      </div>
    );
  };

  export default DashboardListComponent;