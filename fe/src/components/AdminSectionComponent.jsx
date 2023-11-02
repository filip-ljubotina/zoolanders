import React from 'react';
import UserTableComponent from './adminTables/UserTableComponent';
import ApproveTableComponent from './adminTables/ApproveTableComponent';

const AdminSectionComponent = () => {
  return (
    <div>
      <h3>Admin Section</h3>
      <div>
        <h3>All Users Table</h3>
        <UserTableComponent />
        <h3>Waiting for Approval</h3>
        <ApproveTableComponent />
      </div>
    </div>
  );
};

export default AdminSectionComponent;
