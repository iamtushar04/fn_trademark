import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg';
import { FaFilter } from "react-icons/fa";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Sidebar = ({
  companies = [],
  designations = [],
  services = [], 
  selectedCompanies,
  selectedDesignations,
  selectedServices,
  applyFilters,
  resetFilters
}) => {
  const [localSelectedCompanies, setLocalSelectedCompanies] = useState(selectedCompanies);
  const [localSelectedDesignations, setLocalSelectedDesignations] = useState(selectedDesignations);
  const [localSelectedServices, setLocalSelectedServices] = useState(selectedServices);

  
  const [openDropdown, setOpenDropdown] = useState({
    companies: false,
    designations: false,
    services: false,
  });

  useEffect(() => {
    setLocalSelectedCompanies(selectedCompanies);
    setLocalSelectedDesignations(selectedDesignations);
    setLocalSelectedServices(selectedServices);
    
  }, [selectedCompanies, selectedDesignations, selectedServices]);

  const handleCompanyChange = (company) => {
    const newSelection = { ...localSelectedCompanies, [company]: !localSelectedCompanies[company] };
    setLocalSelectedCompanies(newSelection);
  };

  const handleDesignationChange = (designation) => {
    const newSelection = { ...localSelectedDesignations, [designation]: !localSelectedDesignations[designation] };
    setLocalSelectedDesignations(newSelection);
  };

  const handleServiceChange = (service) => {
    const newSelection = { ...localSelectedServices, [service]: !localSelectedServices[service] };
    setLocalSelectedServices(newSelection);
  };

  const handleApplyFilters = () => {
    applyFilters(localSelectedCompanies, localSelectedDesignations, localSelectedServices);
  };

  const handleResetFilters = () => {
    setLocalSelectedCompanies({});
    setLocalSelectedDesignations({});
    setLocalSelectedServices({});
    resetFilters();
  };

  const toggleDropdown = (section) => {
    setOpenDropdown(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" />
      <h4>Filters <FaFilter /></h4>

      {/* Companies Dropdown */}
      <div className="filter-container">
        <div className="filter-header" onClick={() => toggleDropdown('companies')}>
          <h4>Companies {openDropdown.companies ? <FaCaretUp /> : <FaCaretDown />}</h4>
        </div>
        {openDropdown.companies && (
          <div className="filter-options">
            {companies.map(company => (
              <div key={company} className="filter-checkbox">
                <input
                  type="checkbox"
                  id={company}
                  checked={localSelectedCompanies[company] || false}
                  onChange={() => handleCompanyChange(company)}
                />
                <label htmlFor={company}>{company}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Designations Dropdown */}
      <div className="filter-container">
        <div className="filter-header" onClick={() => toggleDropdown('designations')}>
          <h4>Designations {openDropdown.designations ? <FaCaretUp /> : <FaCaretDown />}</h4>
        </div>
        {openDropdown.designations && (
          <div className="filter-options">
            {designations.map(designation => (
              <div key={designation} className="filter-checkbox">
                <input
                  type="checkbox"
                  id={designation}
                  checked={localSelectedDesignations[designation] || false}
                  onChange={() => handleDesignationChange(designation)}
                />
                <label htmlFor={designation}>{designation}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Services Dropdown */}
      <div className="filter-container">
        <div className="filter-header" onClick={() => toggleDropdown('services')}>
          <h4>Services {openDropdown.services ? <FaCaretUp /> : <FaCaretDown />}</h4>
        </div>
        {openDropdown.services && (
          <div className="filter-options">
            {services.map(service => (
              <div key={service} className="filter-checkbox">
                <input
                  type="checkbox"
                  id={service}
                  checked={localSelectedServices[service] || false}
                  onChange={() => handleServiceChange(service)}
                />
                <label htmlFor={service}>{service}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="filter-buttons">
        <button onClick={handleApplyFilters} className="filter-button">Apply</button>
        <button onClick={handleResetFilters} className="filter-button">Reset</button>
      </div>

      <style jsx>{`
        img {
          margin-bottom: 20px;
        }
        .sidebar {
          background-color: #f0f0f0; /* Light gray background */
          padding: 10px; 
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Optional shadow for a sidebar effect */
        }
        .filter-container {
          margin-bottom: 10px; /* Space below the filter */
        }
        .filter-header {
          cursor: pointer; /* Pointer cursor for dropdown header */
          display: flex; /* Flexbox for header alignment */
          justify-content: space-between; /* Space between title and arrow */
          align-items: center; /* Center align items */
          padding: 5px; /* Padding for header */
          background-color: #e9ecef; /* Light background for header */
          border-radius: 4px; /* Rounded corners */
        }
        .filter-options {
          padding-left: 20px;
          max-height: 120px;
          overflow-y: auto; /* Enable vertical scrolling for options */
        }
        .filter-checkbox {
          margin-bottom: 5px; /* Space between checkbox rows */
        }
        .filter-buttons {
          margin: 10px 0; /* Space for buttons */
        }
        .filter-button {
          margin-right: 10px; /* Space between buttons */
          padding: 8px 12px; /* Padding for buttons */
          background-color: #007bff; /* Button background color */
          color: white; /* Button text color */
          border: none; /* Remove border */
          border-radius: 4px; /* Rounded corners */
          cursor: pointer; /* Pointer cursor on hover */
        }
        .filter-button:hover {
          background-color: #0056b3; /* Darker blue on hover */
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
