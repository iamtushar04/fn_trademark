// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { isAuth } = useAuth(); // Use isAuth to determine if the user is authenticated

    return isAuth ? element : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
