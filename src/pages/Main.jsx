
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Table from '../components/Table';
import { useData } from '../Context/DataContext';
import Navbar from '../components/Navbar';

const MainPage = () => {
  const { data } = useData();

  const [selectedCompanies, setSelectedCompanies] = useState({});
  const [selectedDesignations, setSelectedDesignations] = useState({});
  const [selectedServices, setSelectedServices] = useState({});

  const applyFilters = (companies, designations, services) => {
    setSelectedCompanies(companies);
    setSelectedDesignations(designations);
    setSelectedServices(services);
  };


const resetFilters = () => {
  setSelectedCompanies({});
  setSelectedDesignations({});
  setSelectedServices({});
};


  return (
    <div className="main-container">
      <Sidebar
        companies={[...new Set(data.map(item => item.company))]}
        designations={[...new Set(data.map(item => item.designation))]}
        services={['Litigation', 'Patent']} // Adjust services as needed
        selectedCompanies={selectedCompanies}
        selectedDesignations={selectedDesignations}
        selectedServices={selectedServices}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
      <div className="content">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Table data={data} selectedCompanies={selectedCompanies} selectedDesignations={selectedDesignations} selectedServices={selectedServices} />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>

      <style jsx>{`
        .main-container {
          display: flex;
          height: 100vh; /* Full height of the viewport */
        }
        .content {
          width: 100%;
          background-color: #ffffff; /* White background */
          // padding: 20px; /* Some padding for the right content */
        }
      `}</style>
    </div>
  );
};

export default MainPage;
