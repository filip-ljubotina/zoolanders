import React from 'react';

const ApproveTableRow = ({ data, onApprove }) => {

  const handleApproveClick = () => {
    onApprove(data.id, data);
  };

  return (
    <tr>
      <td>{data.id}</td>
      <td>
        {data.userName}
      </td>
      <td>
        {data.firstName}
      </td>
      <td>
        {data.lastName}
      </td>
      <td>
        {data.email}
      </td>
      <td>
        {data.role}
      </td>
      <td>
        {<button onClick={handleApproveClick}>Approve</button>}
      </td>
    </tr>
  );
};

export default ApproveTableRow;
