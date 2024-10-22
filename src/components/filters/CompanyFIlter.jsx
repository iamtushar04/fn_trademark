import React, { useState, useEffect } from 'react';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const CompaniesFilter = ({ localSelectedCompanies, handleCompanyChange, toggleDropdown, openDropdown, searchCompany, setSearchCompany }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://135.181.19.83:5039/get_companies/');
        const data = await response.json();

        // Ensure data is an array
        if (Array.isArray(data)) {
          setCompanies(data);
        } else {
          console.warn('Expected an array, received:', data);
          setCompanies([]); 
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
        setCompanies([]); // Optional: set to empty array on error
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies safely
  const filteredCompanies = (companies || []).filter(company => 
    company?.name?.toLowerCase().includes(searchCompany.toLowerCase())
  );

  return (
    <div className="filter-container">
    <div className="filter-header" onClick={() => toggleDropdown('companies')}>
      <h4>Companies {openDropdown.companies ? <FaCaretUp /> : <FaCaretDown />}</h4>
    </div>
    {openDropdown.companies && (
      <div className="filter-options">
        <input
          type="text"
          placeholder="Search companies..."
          value={searchCompany}
          onChange={(e) => setSearchCompany(e.target.value)}
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
  );
};

export default CompaniesFilter;
