// src/FilterContext.js
import React, { createContext, useContext, useState } from 'react';
import { useData } from '../Context/DataContext'; 

// Create a context
const FilterContext = createContext();

// Create a provider component
export const FilterProvider = ({ children }) => {
  const { data } = useData(); // Get data from DataContext
  const [filters, setFilters] = useState({
    companies: { options: [], isCollapsed: true },
    designations: { options: [], isCollapsed: true },
    services: { options: [], isCollapsed: true },
  });

  const updateFilters = (filterName, index) => {
    const updatedOptions = [...filters[filterName].options];
    updatedOptions[index] = !updatedOptions[index]; 
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: { ...prevFilters[filterName], options: updatedOptions },
    }));
  };

  const toggleCollapse = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: {
        ...prevFilters[filterName],
        isCollapsed: !prevFilters[filterName].isCollapsed,
      },
    }));
  };

  // Extract unique options for filters
  const companies = [...new Set(data.map(item => item.company))];
  const designations = [...new Set(data.map(item => item.designation))];
  const services = [...new Set(data.map(item => item.service))];

  // Initialize options for the filters
  if (filters.companies.options.length === 0) {
    setFilters(prev => ({
      ...prev,
      companies: { options: companies.map(() => false), isCollapsed: true },
    }));
  }
  
  if (filters.designations.options.length === 0) {
    setFilters(prev => ({
      ...prev,
      designations: { options: designations.map(() => false), isCollapsed: true },
    }));
  }

  if (filters.services.options.length === 0) {
    setFilters(prev => ({
      ...prev,
      services: { options: services.map(() => false), isCollapsed: true },
    }));
  }

  // Filter data based on selected options
  const filteredData = data.filter(item => {
    const companyFilter = filters.companies.options[data.map(d => d.company).indexOf(item.company)] && item.company;
    const designationFilter = filters.designations.options[data.map(d => d.designation).indexOf(item.designation)] && item.designation;
    const serviceFilter = filters.services.options[data.map(d => d.service).indexOf(item.service)] && item.service;

    return companyFilter || designationFilter || serviceFilter;
  });

  return (
    <FilterContext.Provider value={{ filters, updateFilters, toggleCollapse, filteredData }}>
      {children}
    </FilterContext.Provider>
  );
};

// Create a custom hook for easy access
export const useFilters = () => useContext(FilterContext);
