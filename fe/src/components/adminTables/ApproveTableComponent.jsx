import React, { useState, useEffect } from 'react';
import ApproveTableRow from './ApproveTableRow';
import ApiService from '../../../app';

const ApproveTableComponent = () => {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await ApiService.get('/wildTrack/admin/getApprovalTable');
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const updateData = async (rowData) => {
    try {
      await ApiService.put('/wildTrack/admin/putApprovalTable', rowData);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id, updatedData) => {
    try {
      await updateData(updatedData);
      const updatedTableData = tableData.filter((row) => row.id !== id);
      setTableData(updatedTableData);
      console.log('Updated Row:', id, updatedData);
    } catch (error) {
      console.error('Error approving row:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>userName</th>
          <th>image</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>email</th>
          <th>role</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <ApproveTableRow key={row.id} data={row} onApprove={handleApprove} />
        ))}
      </tbody>
    </table>
  );
};

export default ApproveTableComponent;
