import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAccess = () => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple access code check - in a real app, this would be more secure
    if (accessCode === 'awon-admin-2024') {
      navigate('/admin/login');
    } else {
      setError('Invalid access code');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
        
        <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-md">
          <h2 className="font-semibold mb-2">Admin Access Instructions:</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Enter the admin access code below</li>
            <li>Login with your admin credentials</li>
            <li>You'll be redirected to the admin dashboard</li>
          </ol>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-1">
              Access Code
            </label>
            <input
              type="password"
              id="accessCode"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter admin access code"
              required
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
          >
            Access Admin Panel
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-teal-600 hover:text-teal-800 text-sm"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAccess;