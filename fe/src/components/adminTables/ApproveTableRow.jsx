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
      <div>
            {data.image && (
              <img
                src={`data:image/png;base64,${data.image}`}
                alt="User"
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
            )}
          </div>
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
