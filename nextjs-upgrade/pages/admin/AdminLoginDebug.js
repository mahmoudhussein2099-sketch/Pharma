import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminLoginDebug = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const [debugInfo, setDebugInfo] = useState({});
  
  useEffect(() => {
    // Collect debug info
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    
    setDebugInfo({
      isAuthenticated,
      isAdmin,
      hasToken: !!token,
      hasAdminToken: !!adminToken,
      tokenPreview: token ? `${token.substring(0, 10)}...` : 'none',
      adminTokenPreview: adminToken ? `${adminToken.substring(0, 10)}...` : 'none'
    });
  }, [isAuthenticated, isAdmin]);
  
  const handleDirectLogin = () => {
    // Set admin token directly
    const fakeToken = 'admin_token_' + Date.now();
    localStorage.setItem('adminToken', fakeToken);
    
    // Force reload to dashboard
    window.location.href = '/admin/dashboard';
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mb-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
          Admin Login Debug
        </h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Authentication State:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
        
        <button
          onClick={handleDirectLogin}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded mb-4"
        >
          Force Login (Bypass Authentication)
        </button>
        
        <button
          onClick={() => navigate('/admin/login')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
        >
          Back to Normal Login
        </button>
      </div>
    </div>
  );
};

export default AdminLoginDebug;