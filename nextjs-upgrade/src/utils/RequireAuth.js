import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminToken"); // change this to real token logic
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
