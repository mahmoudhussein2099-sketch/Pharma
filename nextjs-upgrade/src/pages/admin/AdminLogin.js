import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { handleAdminLogin } from '../../utils/authAdapter';
import { useTranslation } from 'react-i18next';

const AdminLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Use the regular login endpoint
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || t('invalidLogin'));
      }
      
      // Use the context login function with isAdminLogin=true
      login(data.token, true);
      
      // Use our adapter to handle admin login
      handleAdminLogin(data.token);
      
      // Navigate to dashboard
      navigate('/admin/dashboard');

    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-600 dark:text-teal-400">
          {t('adminLogin')}
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('email')}
            </label>
            <input
              type="email"
              id="email"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-md border bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('password')}
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-md border bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            {t('login')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;