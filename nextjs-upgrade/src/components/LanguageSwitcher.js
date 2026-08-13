import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Set HTML dir attribute for RTL/LTR support
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    // Store language preference
    localStorage.setItem('language', lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded text-sm ${
          i18n.language === 'en' ? 'bg-teal-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('ar')}
        className={`px-2 py-1 rounded text-sm ${
          i18n.language === 'ar' ? 'bg-teal-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
      >
        عربي
      </button>
    </div>
  );
};

export default LanguageSwitcher;