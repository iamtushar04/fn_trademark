import React, { useState } from 'react';
import { useFilter } from '../../Context/FilterContext';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const CompaniesFilter = () => {
  const {
    filteredCompanies,
    loading,
    error,
    localSelectedCompanies,
    handleCompanyChange,
    searchTerm,
    setSearchTerm,
  } = useFilter();

  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(prev => !prev);
  };

  // Function to get the selected companies
  const getSelectedCompanies = () => {
    return Object.keys(localSelectedCompanies).filter(company => localSelectedCompanies[company]);
  };

  
  const handleChange = (company) => {
    handleCompanyChange(company); // Update the selected companies in context
    const selectedCompanies = getSelectedCompanies();
    console.log("Selected Companies:", selectedCompanies);
    // You can call any function here to send selected companies further if needed
  };

  return (
    <div className="filter-container">
      <div className="filter-header" onClick={toggleDropdown}>
        <h4>
          Companies {openDropdown ? <FaCaretUp /> : <FaCaretDown />}
        </h4>
      </div>
      {openDropdown && (
        <div className="filter-options">
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-search"
          />
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error fetching companies.</div>
          ) : filteredCompanies.length > 0 ? (
            filteredCompanies.map(company => (
              <div key={company} className="filter-checkbox">
                <input
                  type="checkbox"
                  id={`company-${company}`}
                  checked={localSelectedCompanies[company] || false}
                  onChange={() => handleChange(company)} 
                />
                <label htmlFor={`company-${company}`}>{company}</label>
              </div>
            ))
          ) : (
            <div>No companies found.</div>
          )}
        </div>
      )}
      <style jsx>{`
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

export default CompaniesFilter;
