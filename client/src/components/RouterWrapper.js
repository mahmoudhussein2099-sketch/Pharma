import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname]);

  return null;
};

export default function RouterWrapper({ children }) {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {children}
    </BrowserRouter>
  );
}
