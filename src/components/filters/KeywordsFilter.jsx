import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useFilter } from '../../Context/FilterContext';

const KeywordFilter = () => {
  const {
    keywords,                // Use keywords from context
    localSelectedServices,
    handleServiceChange,
    searchTerm,
    setSearchTerm,
  } = useFilter(); 

  const [open, setOpen] = useState(false);

  const filterKeywords = () => {
    return (keywords || []).filter(keyword =>
      typeof keyword === 'string' && keyword.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredKeywords = filterKeywords();
  console.log(keywords);

  return (
    <div className="filter-container">
      <div className="filter-header" onClick={() => setOpen(prev => !prev)}>
        <h4>Keywords {open ? <FaCaretUp /> : <FaCaretDown />}</h4>
      </div>
      {open && (
        <div className="filter-options">
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-search"
          />
          {filteredKeywords.length > 0 ? (
            filteredKeywords.map(keyword => (
              <div key={keyword} className="filter-checkbox">
                <input
                  type="checkbox"
                  id={keyword}
                  checked={localSelectedServices[keyword] || false}
                  onChange={() => handleServiceChange(keyword)}
                />
                <label htmlFor={keyword}>{keyword}</label>
              </div>
            ))
          ) : (
            <div>No keywords found.</div>
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

export default KeywordFilter;
