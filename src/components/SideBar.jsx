import React, { useEffect } from 'react';
import logo from '../assets/logo.jpg';
import { FaFilter, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useFilter } from '../Context/FilterContext';
import { useState } from 'react';

const Sidebar = () => {
  const {
    companies,
    designations,
    loading,
    localSelectedCompanies,
    localSelectedDesignations,
    localSelectedServices,
    handleCompanyChange,
    handleDesignationChange,
    handleServiceChange,
    handleApplyFilters,
    filteredCompanies,
    filteredDesignations,
    searchTerm,
    setSearchTerm,
    keywords,
    attorneysData,
  } = useFilter();

  const [openDropdown, setOpenDropdown] = useState({
    companies: false,
    designations: false,
    keywords: false,
  });

  const toggleDropdown = (section) => {
    setOpenDropdown(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredServices = []; // Define how you want to handle services if needed

  const handleResetFilters = () => {
    // setLocalSelectedCompanies({});
    // setLocalSelectedDesignations({});
    // setLocalSelectedServices({});
    // resetFilters();
    window.location.reload();
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
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-search"
            />
            {filteredCompanies.map(company => (
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
            <input
              type="text"
              placeholder="Search designations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-search"
            />
            {filteredDesignations.map(designation => (
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

      {/* Keywords Dropdown */}
      <div className="filter-container">
        <div className="filter-header" onClick={() => toggleDropdown('keywords')}>
          <h4>Keywords {openDropdown.keywords ? <FaCaretUp /> : <FaCaretDown />}</h4>
        </div>
        {openDropdown.keywords && (
          <div className="filter-options">
            <input
              type="text"
              placeholder="Search keywords..."
              className="filter-search"
            />
            {keywords.map(keyword => (
              <div key={keyword} className="filter-checkbox">
                <input
                  type="checkbox"
                  id={keyword}
                  checked={localSelectedServices[keyword] || false}
                  onChange={() => handleServiceChange(keyword)}
                />
                <label htmlFor={keyword}>{keyword}</label>
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
          background-color: #f0f0f0;
          padding: 10px; 
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        }
        .filter-container {
          margin-bottom: 10px; 
        }
        .filter-header {
          cursor: pointer; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          padding: 5px; 
          background-color: #e9ecef; 
          border-radius: 4px; 
        }
        .filter-options {
          padding-left: 20px;
          max-height: 120px;
          overflow-y: auto; 
        }
        .filter-checkbox {
          margin-bottom: 5px; 
        }
        .filter-buttons {
          margin: 10px 0; 
        }
        .filter-button {
          margin-right: 10px; 
          padding: 8px 12px; 
          background-color: #007bff; 
          color: white; 
          border: none; 
          border-radius: 4px; 
          cursor: pointer; 
        }
        .filter-button:hover {
          background-color: #0056b3; 
        }
        .filter-search {
          margin-bottom: 10px;
          padding: 5px;
          width: 100%; 
          border: 1px solid #ccc; 
          border-radius: 4px; 
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
