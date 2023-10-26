// TableComponent.jsx
import React, { useState, useEffect } from 'react';
import TableRow from './UserTableRow';
import ApiService from '../../services/ApiService';

const UserTableComponent = () => {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await ApiService.get('/wildTrack/admin/getUserTable');
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const updateData = async (rowData) => {
    try {
      await ApiService.put('/wildTrack/admin/putUserTable', rowData);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleUpdate = (id, updatedData) => {
    const updatedTableData = tableData.map((row) =>
      row.id === id ? { ...row, ...updatedData } : row
    );
    console.log(updatedData)
    updateData(updatedData)
    setTableData(updatedTableData);

    console.log('Updated Row:', id, updatedData);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>userName</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>email</th>
          <th>role</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <TableRow key={row.id} data={row} onUpdate={handleUpdate} />
        ))}
      </tbody>
    </table>
  );
};

export default UserTableComponent;
