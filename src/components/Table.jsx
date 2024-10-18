import React from 'react';
import { FaEye, FaDownload } from "react-icons/fa";

const Table = ({ data, selectedCompanies, selectedDesignations, selectedServices }) => {
  const filteredData = data.filter(item => 
    (selectedCompanies[item.company] || Object.keys(selectedCompanies).length === 0) &&
    (selectedDesignations[item.designation] || Object.keys(selectedDesignations).length === 0) &&
    (selectedServices[item.service] || Object.keys(selectedServices).length === 0)
  );

  const viewProfile = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((content, index) => (
              <tr key={index}>
                <td>{content.company || 'N/A'}</td>
                <td>{content.name || 'N/A'}</td>
                <td>{content.email || 'N/A'}</td>
                <td>{content.designation || 'N/A'}</td>
                <td>{content.phone || 'N/A'}</td>
                <td>
                  <div className='table-icon'>
                    <div className='action-icon' onClick={() => viewProfile(content.link)}>
                      <FaEye />
                    </div>
                    <div className='action-icon' onClick={() => {/* Implement download logic here */}}>
                      <FaDownload />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <style jsx>{`
        .table-container {
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow-x: auto; /* Enables horizontal scrolling */
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin: 0 auto;
        }
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #b30000; /* Header background color */
          color: white; /* Header text color */
        }
        tr:hover {
          background-color: #f5f5f5; /* Row hover effect */
        }
        .table-icon {
          display: flex;
          align-items: center;
        }
        .action-icon {
          cursor: pointer;
          margin-right: 10px;
          color: #007bff; /* Icon color */
          transition: color 0.3s;
        }
        .action-icon:hover {
          color: #0056b3; /* Darker icon color on hover */
        }
      `}</style>
    </div>
  );
};

export default Table;
