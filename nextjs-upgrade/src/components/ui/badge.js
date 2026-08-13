import React from 'react';

export function Badge({ children, className }) {
  return (
    <span className={`inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded ${className || ''}`}>
      {children}
    </span>
  );
}
