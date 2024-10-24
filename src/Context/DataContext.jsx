import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // fetchData(); // Initial fetch on mount
    }, []);

    // const fetchData = async (params = {}) => {
    //     setLoading(true);
    //     try {
    //         const queryParams = new URLSearchParams(params).toString();
    //         const response = await fetch(`http://135.181.19.83:5039/attorneys/?${queryParams}`);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const result = await response.json();

    //         const transformedData = result.map(user => ({
    //             company: user.company,
    //             name: user.name,
    //             email: user.email,
    //             designation: user.designation,
    //             phone: user.phone,
    //             link: user.weblink,
    //             service: user.services || null
    //         }));

    //         setData(transformedData);
    //         console.log('Fetched Data:', transformedData);
    //     } catch (err) {
    //         setError(err.message);
    //         console.error('Fetch error:', err.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleApplyFilters = (selectedCompanies, selectedDesignations, selectedServices) => {
        const params = {};
        
        if (selectedCompanies.length) {
            params.companies = selectedCompanies.join(',');
        }
        if (selectedDesignations.length) {
            params.designations = selectedDesignations.join(',');
        }
        if (selectedServices.length) {
            params.services = selectedServices.join(',');
        }

        // fetchData(params); 
    };

    return (
        <DataContext.Provider value={{ data, loading, error, handleApplyFilters }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
