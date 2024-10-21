import React, { useState, useEffect } from 'react';

const Table = ({ data, selectedCompanies, selectedDesignations, selectedServices }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  const filteredData = loading ? [] : data.filter(item => 
    (selectedCompanies[item.company] || Object.keys(selectedCompanies).length === 0) &&
    (selectedDesignations[item.designation] || Object.keys(selectedDesignations).length === 0) &&
    (selectedServices[item.service] || Object.keys(selectedServices).length === 0)
  );

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
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="loader">Loading data...</td>
            </tr>
          ) : filteredData.length > 0 ? (
            filteredData.map((content, index) => (
              <tr key={index}>
                <td>{content.company || 'N/A'}</td>
                <td>{content.name || 'N/A'}</td>
                <td>{content.email || 'N/A'}</td>
                <td>{content.designation || 'N/A'}</td>
                <td>{content.phone || 'N/A'}</td>
                <td>
                  {content.link ? (
                    <a href={content.link} target="_blank" rel="noopener noreferrer" className="link">
                      Bio url
                    </a>
                  ) : (
                    'N/A'
                  )}
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
          font: 10px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow-x: auto; /* Enables horizontal scrolling */
          max-width: 850px;
          max-height: 600px;
          overflow-y: auto;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin: 0 auto;
        }
        th, td {
          padding: 10px; /* Reduced padding */
          text-align: left;
          border-bottom: 1px solid #ddd;
          font-size: 12px; /* Reduced font size for table data */
        }
        th {
          background-color: #b30000; /* Header background color */
          color: white; /* Header text color */
          font-size: 14px; /* Font size for headers */
        }
        tr:hover {
          background-color: #f5f5f5; /* Row hover effect */
        }
        .loader {
          text-align: center;
          padding: 20px;
          font-size: 16px;
          color: #007bff; /* Loader text color */
        }
        .link {
          color: #007bff; /* Link color */
          text-decoration: none; /* Remove underline */
        }
        .link:hover {
          text-decoration: underline; /* Underline on hover */
        }
      `}</style>
    </div>
  );
};

export default Table;
