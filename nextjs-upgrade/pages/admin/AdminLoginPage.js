import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminLoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }
    
    // Mock admin login - in a real app, this would call an API
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'admin123') {
        // Store admin info in localStorage
        localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {t('adminLogin', 'Admin Login')}
          </h2>
          <p className="text-gray-400 mb-6">
            {t('adminLoginDesc', 'Access the pharmacy management system')}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900/30 text-red-300 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              {t('email', 'Email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder={t('enterAdminEmail', 'Enter admin email')}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              {t('password', 'Password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder={t('enterAdminPassword', 'Enter admin password')}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('loggingIn', 'Logging in...') : t('login', 'Login')}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {t('adminLoginHelp', 'For admin access only. If you are a customer, please use the')}
            {' '}
            <a href="/login" className="font-medium text-teal-400 hover:underline">
              {t('customerLogin', 'customer login')}
            </a>
          </p>
        </div>
        
        <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-300 font-medium mb-2">
            {t('demoCredentials', 'Demo Credentials')}:
          </p>
          <p className="text-sm text-gray-400">
            {t('email', 'Email')}: admin@example.com
          </p>
          <p className="text-sm text-gray-400">
            {t('password', 'Password')}: admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;