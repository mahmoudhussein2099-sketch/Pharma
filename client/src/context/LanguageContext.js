import React, { createContext, useState, useEffect } from 'react';
import i18n from '../i18n';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Only access localStorage in the browser environment
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set initial language
      i18n.changeLanguage(language);
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      
      // Add RTL styles if Arabic
      if (language === 'ar') {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    }
  }, [language]);

  const changeLanguage = (lng) => {
    setLanguage(lng);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lng);
      i18n.changeLanguage(lng);
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
      
      if (lng === 'ar') {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;