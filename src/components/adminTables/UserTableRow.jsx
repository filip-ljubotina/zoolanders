import React, { useState } from 'react';

const UserTableRow = ({ data, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [rowData, setRowData] = useState(data);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(rowData.id, rowData);
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <tr>
      <td>{rowData.id}</td>
      <td>
        {editing ? (
          <input type="text" name="userName" value={rowData.userName} onChange={handleChange} />
        ) : (
          rowData.userName
        )}
      </td>
      <td>
        {editing ? (
          <input type="text" name="firstName" value={rowData.firstName} onChange={handleChange} />
        ) : (
          rowData.firstName
        )}
      </td>
      <td>
        {editing ? (
          <input type="text" name="lastName" value={rowData.lastName} onChange={handleChange} />
        ) : (
          rowData.lastName
        )}
      </td>
      <td>
        {editing ? (
          <input type="text" name="email" value={rowData.email} onChange={handleChange} />
        ) : (
          rowData.email
        )}
      </td>
      <td>
        {editing ? (
            <select
                name="role"
                value={rowData.role}
                onChange={handleChange}
            >
                <option value="">Select a role</option>
                <option value="ADMIN">Admin</option>
                <option value="RESEARCHER">Researcher</option>
                <option value="STATION_MANAGER">Station Manager</option>
                <option value="SEARCHER_IN_THE_FIELD">Searcher in the Field</option>
            </select>        
        ) : (
          rowData.role
        )}
      </td>
      <td>
        {editing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </td>
    </tr>
  );
};

export default UserTableRow;
