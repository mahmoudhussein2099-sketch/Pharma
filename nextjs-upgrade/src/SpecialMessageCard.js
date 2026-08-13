import React from 'react';

const SpecialMessageCard = ({ theme = 'light', children }) => {
  const baseClasses = "rounded-lg p-6 shadow-md max-w-4xl mx-auto text-center";
  const lightThemeClasses = "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white";
  const darkThemeClasses = "bg-gradient-to-r from-teal-600 via-blue-700 to-purple-800 text-white";

  const classes = theme === 'dark' ? `${baseClasses} ${darkThemeClasses}` : `${baseClasses} ${lightThemeClasses}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default SpecialMessageCard;
