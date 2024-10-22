import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const DesignationFilter = ({ designations = [], selectedDesignations, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Ensure designations is always an array
  const filteredDesignations = (designations || []).filter(designation =>
    designation.toLowerCase().includes(search.toLowerCase())
  );

  const handleDesignationChange = (designation) => {
    const newSelection = { ...selectedDesignations, [designation]: !selectedDesignations[designation] };
    onChange(newSelection);
  };

  return (
    <div className="filter-container">
      <div className="filter-header" onClick={() => setOpen(prev => !prev)}>
        <h4>Designations {open ? <FaCaretUp /> : <FaCaretDown />}</h4>
      </div>
      {open && (
        <div className="filter-options">
          <input
            type="text"
            placeholder="Search designations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="filter-search"
          />
          {filteredDesignations.length > 0 ? (
            filteredDesignations.map(designation => (
              <div key={designation} className="filter-checkbox">
                <input
                  type="checkbox"
                  id={designation}
                  checked={selectedDesignations[designation] || false}
                  onChange={() => handleDesignationChange(designation)}
                />
                <label htmlFor={designation}>{designation}</label>
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
