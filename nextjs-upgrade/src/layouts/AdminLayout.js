import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  // Check if user is logged in as admin
  const isAdmin = localStorage.getItem('adminToken') || 
                 (localStorage.getItem('user') && 
                  JSON.parse(localStorage.getItem('user')).role === 'admin');

  if (!isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="admin-layout" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {children}
    </div>
  );
};

export default AdminLayout;