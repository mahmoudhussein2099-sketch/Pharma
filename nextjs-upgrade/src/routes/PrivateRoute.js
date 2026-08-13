import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  
  // For admin routes, check if user is authenticated as admin
  return isAuthenticated && isAdmin ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
