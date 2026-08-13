import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize with a default value that will be updated in useEffect
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for browser environment
    if (typeof window !== 'undefined') {
      // Get user preference from localStorage or system preference
      const isDarkMode = 
        localStorage.getItem('darkMode') === 'true' || 
        (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      // Update state with the correct value
      setDarkMode(isDarkMode);
      
      // Apply theme
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Apply theme changes when darkMode state changes
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', darkMode);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;