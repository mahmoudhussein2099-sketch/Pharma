import React from 'react';

export function Card({ children, className }) {
  return <div className={`rounded-xl shadow p-4 bg-white dark:bg-gray-800 ${className || ''}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="mt-2 text-gray-700 dark:text-gray-300">{children}</div>;
}
