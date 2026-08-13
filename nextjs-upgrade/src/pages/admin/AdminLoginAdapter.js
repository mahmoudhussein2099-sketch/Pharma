import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminLoginAdapter = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock successful login
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create admin user object
      const adminUser = {
        email: email,
        role: 'admin'
      };
      
      // Store in localStorage
      localStorage.setItem('adminToken', 'mock-admin-token-12345');
      localStorage.setItem('user', JSON.stringify(adminUser));
      
      // Navigate to dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-600 dark:text-teal-400">
          {t('adminLogin', 'Admin Login')}
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('email', 'Email')}
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
              {t('password', 'Password')}
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

          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">
              {t('demoCredentials', 'Demo Credentials')}:
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('email', 'Email')}: admin@admin.com
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('password', 'Password')}: password
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? t('loggingIn', 'Logging in...') : t('login', 'Login')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginAdapter;