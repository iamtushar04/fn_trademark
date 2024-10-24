import { createContext, useContext, useEffect, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [services, setServices] = useState([]); // Assuming you may want to fetch services in the future
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localSelectedCompanies, setLocalSelectedCompanies] = useState({});
  const [localSelectedDesignations, setLocalSelectedDesignations] = useState({});
  const [localSelectedServices, setLocalSelectedServices] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [keywords, setKeywords] = useState([]); // Changed to an array
  const [attorneysData, setAttorneysData] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://135.181.19.83:5039/get_companies/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data.companies)) {
          setCompanies(data.companies);
          setKeywords(data.keywords || []); // Set keywords from API response
        } else {
          console.warn('Expected an array of companies, received:', data);
          setCompanies([]);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const fetchDesignations = async (selectedCompanies) => {
    setLoading(true);
    try {
      const companiesString = selectedCompanies.map(company => `company=${encodeURIComponent(company)}`).join('&');
      const response = await fetch(`http://135.181.19.83:5039/get_designations/?${companiesString}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (Array.isArray(data.designations)) {
        setDesignations(data.designations);
      } else {
        console.warn('Expected an array of designations, received:', data);
        setDesignations([]);
      }
    } catch (error) {
      console.error('Error fetching designations:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    handleApplyFilters();
      
    
  }, []);

  const handleApplyFilters = async () => {
    const selectedCompanies = Object.keys(localSelectedCompanies).filter(company => localSelectedCompanies[company]);
    const selectedDesignations = Object.keys(localSelectedDesignations).filter(designation => localSelectedDesignations[designation]);
    const selectedServices = Object.keys(localSelectedServices).filter(service => localSelectedServices[service]);
    
    const params = {
      company: selectedCompanies.length > 0 ? selectedCompanies : undefined,
    designation: selectedDesignations.length > 0 ? selectedDesignations : undefined,
    Keyword: selectedServices.length > 0 ? selectedServices : undefined,
      
    };
  
    try {
      const response = await fetch('http://135.181.19.83:5039/attorneys/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        

        body: JSON.stringify(params),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('API response data:', data);
      setAttorneysData(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCompanyChange = (companyName) => {
    setLocalSelectedCompanies(prev => {
      const updatedSelection = {
        ...prev,
        [companyName]: !prev[companyName],
      };

      fetchDesignations(Object.keys(updatedSelection).filter(company => updatedSelection[company]));

      return updatedSelection;
    });
  };

  const handleDesignationChange = (designation) => {
    setLocalSelectedDesignations(prev => ({
      ...prev,
      [designation]: !prev[designation],
    }));
  };

  const handleServiceChange = (service) => {
    setLocalSelectedServices(prev => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  const filteredCompanies = companies.filter(company =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDesignations = designations.filter(designation =>
    typeof designation === 'string' && designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FilterContext.Provider
      value={{
        companies,
        designations,
        services,
        loading,
        error,
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
        keywords, // Pass keywords to the context
        attorneysData,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
