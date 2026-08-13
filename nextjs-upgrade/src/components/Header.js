// src/components/Header.js
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const { i18n, t } = useTranslation();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    document.dir = isRTL ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow p-4 flex items-center justify-between sticky top-0 z-30">
      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-teal-700 dark:text-white">
          Lovable
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="flex gap-6">
          <li>
            <a href="#" className="nav-link active text-teal-700 dark:text-white font-semibold hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-gray-700 dark:text-gray-300 hover:underline">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-gray-700 dark:text-gray-300 hover:underline">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-gray-700 dark:text-gray-300 hover:underline">
              About
            </a>
          </li>
        </ul>
      </nav>

      {/* Controls: Language | Theme | Logout */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => switchLanguage('en')}
          className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          🇺🇸 EN
        </button>
        <button
          onClick={() => switchLanguage('ar')}
          className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          🇸🇦 AR
        </button>
        <button
          onClick={() => switchLanguage('hi')}
          className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          🇮🇳 HI
        </button>

        <button
          onClick={toggleTheme}
          className="text-sm bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        <button
          onClick={handleLogout}
          className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          {t('logout')}
        </button>
      </div>
    </header>
  );
};

export default Header;
