import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const ServiceFilter = ({ services = [], selectedServices, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Ensure services is always an array
  const filteredServices = (services || []).filter(service =>
    service.toLowerCase().includes(search.toLowerCase())
  );

  const handleServiceChange = (service) => {
    const newSelection = { ...selectedServices, [service]: !selectedServices[service] };
    onChange(newSelection);
  };

  return (
    <div className="filter-container">
      <div className="filter-header" onClick={() => setOpen(prev => !prev)}>
        <h4>Keywords {open ? <FaCaretUp /> : <FaCaretDown />}</h4>
      </div>
      {open && (
        <div className="filter-options">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="filter-search"
          />
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <div key={service} className="filter-checkbox">
                <input
                  type="checkbox"
                  id={service}
                  checked={selectedServices[service] || false}
                  onChange={() => handleServiceChange(service)}
                />
                <label htmlFor={service}>{service}</label>
              </div>
            ))
          ) : (
            <div>No services found.</div>
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

export default ServiceFilter;
