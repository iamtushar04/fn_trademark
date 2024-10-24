import React from 'react';
import { useFilter } from '../../Context/FilterContext';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useState } from 'react';

const DesignationFilter = () => {
  const {
    filteredDesignations,
    loading,
    error,
    localSelectedDesignations,
    handleDesignationChange,
    searchTerm,
    setSearchTerm,
  } = useFilter();

  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(prev => !prev);
  };

  return (
    <div className="filter-container">
      <div className="filter-header" onClick={toggleDropdown}>
        <h4>
          Designations {openDropdown ? <FaCaretUp /> : <FaCaretDown />}
        </h4>
      </div>
      {openDropdown && (
        <div className="filter-options">
          <input
            type="text"
            placeholder="Search designations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-search"
          />
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error fetching designations.</div>
          ) : filteredDesignations.length > 0 ? (
            filteredDesignations.map(designation => (
              <div key={designation} className="filter-checkbox">
                <input
                  type="checkbox"
                  id={`designation-${designation}`} 
                  checked={localSelectedDesignations[designation] || false}
                  onChange={() => handleDesignationChange(designation)}
                />
                <label htmlFor={`designation-${designation}`}>{designation}</label>
              </div>
            ))
          ) : (
            <div>No designations found.</div>
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

export default DesignationFilter;
