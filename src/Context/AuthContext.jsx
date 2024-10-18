import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const isTokenValid = (token) => {
    const expiryTime = localStorage.getItem('token_expiry');
    const currentTime = Date.now();

    // If there's no expiry time or token, return false
    if (!token || !expiryTime) return false;

    // Return true if the current time is less than the expiry time
    return currentTime < Number(expiryTime);
};

const useIsAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return isTokenValid(token);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(useIsAuthenticated());

    // Check local storage for user data on initial load
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const storedUser = localStorage.getItem('user');

        if (isTokenValid(token)) {
            setIsAuth(true); // User is authenticated if token is valid
            if (storedUser) {
                setUser(JSON.parse(storedUser)); // Restore user data
            }
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post(import.meta.env.VITE_AUTH_API_URL+'/auth/login', {
                username,
                password,
            });
    
            const userData = response.data;
    
            if (userData.access_token) {
                // Store access_token in local storage
                localStorage.setItem('access_token', userData.access_token);
                localStorage.setItem('user_id',userData.id)

                const expiryTime = Date.now() + 60 * 30 * 1000; // 30 minutes in milliseconds
                localStorage.setItem('token_expiry', expiryTime);
                
                // Set isAuth state to true and store it in local storage
                localStorage.setItem('isAuth', 'true');
                setIsAuth(true);
    
                return { success: true };
            }
    
            // If no token is present, set isAuth to false
            localStorage.setItem('isAuth', 'false');
            setIsAuth(false);
            return { success: false, error: 'Login failed! Invalid credentials.' };
        } catch (error) {
            console.error('Error logging in:', error);
            // Set isAuth to false on error
            localStorage.setItem('isAuth', 'false');
            setIsAuth(false);
            return { success: false, error: error.response?.data?.message || 'Login failed!' };
        }
    };
    

    const signup = async (userData) => {
        try {
            console.log('Sending signup request with data:', userData);
            
            const response = await axios.post(import.meta.env.VITE_AUTH_API_URL+`/auth/signup`,{userData});
            
            console.log('Received response:', response);
    
            const newUserData = response.data;
    
            // Check if the response indicates a successful signup
            if (response.status === 200) {
                console.log('Signup successful:', newUserData);
                // Store access_token in local storage
                // localStorage.setItem('access_token', newUserData.access_token);
                // setIsAuth(true); // Update isAuth state to true
    
                // Store user data in local storage
                setUser(newUserData);
                // localStorage.setItem('user', JSON.stringify(newUserData));
    
                return { success: true };
            }
    
            console.warn('Signup failed with response status:', response.status);
            return { success: false, error: 'Signup failed! Invalid data.' };
        } catch (error) {
            console.error('Error signing up:', error);
            console.error('Error response data:', error.response?.data);
            return { success: false, error: error.response?.data?.message || 'Signup failed!' };
        }
    };
    
    const logout = async () => {
        const token = localStorage.getItem('access_token'); // Retrieve the access token
    
        try {
            await axios.post(import.meta.env.VITE_AUTH_API_URL+'/auth/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            });
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setUser(null); // Clear user state
            localStorage.removeItem('access_token'); // Clear access_token from local storage
            localStorage.removeItem('token_expiry')
             // Clear user data from local storage
            setIsAuth(false); 
            localStorage.setItem('isAuth', 'false');

            return { success: true };
        }
    };
    

    return (
        <AuthContext.Provider value={{ user, isAuth, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
