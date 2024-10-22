import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = ({ data, selectedCompanies, selectedDesignations, selectedServices }) => {
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    company: "",
    name: "",
    designation: "",
    email: "",
    phone: "",
    city: "",
    weblink: "",
    services: "",
    industry: "",
    keyword: "",
    description: ""
  });
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulated loading time

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTableData(data); // Set initial data
  }, [data]);

  const filteredData = loading ? [] : tableData.filter(item => 
    (selectedCompanies[item.company] || Object.keys(selectedCompanies).length === 0) &&
    (selectedDesignations[item.designation] || Object.keys(selectedDesignations).length === 0) &&
    (selectedServices[item.service] || Object.keys(selectedServices).length === 0)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://135.181.19.83:5039/add_attorney/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Show success toast
      toast.success('Entry added successfully!');

      const data = await response.json(); // Assuming you might want to use the response data
      setTableData((prev) => [...prev, newEntry]);
      setNewEntry({
        company: "",
        name: "",
        designation: "",
        email: "",
        phone: "",
        city: "",
        weblink: "",
        services: "",
        industry: "",
        keyword: "",
        description: ""
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding entry:', error);
      // Show error toast
      toast.error('Failed to add entry. Please try again.');
    }
  };

  const downloadCSV = () => {
    const csvContent = [
      ['Company', 'Name', 'Email', 'Designation', 'Phone', 'Link'],
      ...filteredData.map(item => [
        item.company,
        item.name,
        item.email,
        item.designation,
        item.phone,
        item.link
      ])
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'table_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="table-container">
      <ToastContainer />
      <div className="button-container">
        <button onClick={() => setShowForm(!showForm)} className="toggle-form-button">
          {showForm ? 'Cancel' : 'Add Entry'}
        </button>
        <button onClick={downloadCSV} className="download-button">
          Download CSV
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddEntry} className="add-entry-form">
          <input type="text" name="company" placeholder="Company" value={newEntry.company} onChange={handleChange} required />
          <input type="text" name="name" placeholder="Name" value={newEntry.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={newEntry.email} onChange={handleChange} required />
          <input type="text" name="designation" placeholder="Designation" value={newEntry.designation} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone" value={newEntry.phone} onChange={handleChange} required />
          <input type="text" name="link" placeholder="Link" value={newEntry.link} onChange={handleChange} />
          <button type="submit">Add Entry</button>
        </form>
      )}

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
          overflow-x: auto;
          max-width: 850px;
          max-height: 600px;
          overflow-y: auto;
          padding: 20px;
        }
        .button-container {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        .toggle-form-button,
        .download-button {
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-left: 10px;
        }
        .toggle-form-button:hover,
        .download-button:hover {
          background-color: #0056b3;
        }
        .add-entry-form {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }
        .add-entry-form input {
          margin-bottom: 10px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .add-entry-form button {
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .add-entry-form button:hover {
          background-color: #0056b3;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin: 0 auto;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          font-size: 12px;
        }
        th {
          background-color: #b30000;
          color: white;
          font-size: 14px;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
        .loader {
          text-align: center;
          padding: 20px;
          font-size: 16px;
          color: #007bff;
        }
        .link {
          color: #007bff;
          text-decoration: none;
        }
        .link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Table;
