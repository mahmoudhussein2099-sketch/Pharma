import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const AdminPageWrapper = ({ children, title }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`p-6 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {title && (
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>
      )}
      <div className={`rounded-lg shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {children}
      </div>
    </div>
  );
};

export default AdminPageWrapper;