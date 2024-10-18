// src/DataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context
const DataContext = createContext();

// Possible designations, patents, and services
const designationsList = ['Manager', 'Developer', 'Designer', 'Analyst', 'Sales'];
const patentsList = ['Patent A', 'Patent B', 'Patent C', 'Patent D', 'Patent E'];
const servicesList = ['Litigation', 'Patent'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const hasPatent = () => Math.random() < 0.5; // 50% chance to have a patent
const assignService = () => Math.random() < 0.5 ? 'Litigation' : 'Patent'; // 50% chance for each service

// Provider component
export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                // Transform the data to match your structure if needed
                const transformedData = result.map(user => {
                    const designation = getRandomElement(designationsList);
                    const patent = hasPatent() ? getRandomElement(patentsList) : null;
                    const service = assignService(); // Randomly assign service
                    return {
                        company: user.company.name,
                        name: user.name,
                        email: user.email,
                        designation, // Randomly assigned designation
                        phone: user.phone,
                        link: `/profile/${user.id}`, // Assuming profile links use user ID
                        patent, // Randomly assigned patent or null
                        service // Randomly assigned service
                    };
                });
                setData(transformedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};

// Custom hook to use the DataContext
export const useData = () => {
    return useContext(DataContext);
};
