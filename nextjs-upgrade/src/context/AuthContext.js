import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(false);
    } else if (adminToken) {
      setIsAuthenticated(true);
      setIsAdmin(true);
    }
    
    setLoading(false);
  }, []);

  const login = (token, isAdminLogin = false) => {
    if (isAdminLogin) {
      localStorage.setItem('adminToken', token);
      setIsAdmin(true);
    } else {
      localStorage.setItem('token', token);
      setIsAdmin(false);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;