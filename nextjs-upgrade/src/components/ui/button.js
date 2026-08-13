import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-white text-black rounded shadow font-semibold transition hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};
