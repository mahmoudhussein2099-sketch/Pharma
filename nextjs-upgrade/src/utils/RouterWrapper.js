import React from 'react';

// Create a mock Link component that uses Next.js Link under the hood
export const Link = ({ to, children, ...props }) => {
  // For client-side only
  if (typeof window === 'undefined') {
    return <a href={to} {...props}>{children}</a>;
  }
  
  // Import dynamically on client side
  const NextLink = require('next/link').default;
  return (
    <NextLink href={to} {...props}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

// Create a mock Router context
export const RouterContext = React.createContext({
  basename: '',
  navigator: {
    createHref: (to) => to,
    push: () => {},
    replace: () => {},
    go: () => {},
    back: () => {},
    forward: () => {},
  },
  static: false,
  location: typeof window !== 'undefined' ? window.location : { pathname: '/' },
});

// Create a mock BrowserRouter component
export const BrowserRouter = ({ children }) => {
  return (
    <RouterContext.Provider value={{
      basename: '',
      navigator: {
        createHref: (to) => to,
        push: () => {},
        replace: () => {},
        go: () => {},
        back: () => {},
        forward: () => {},
      },
      static: false,
      location: typeof window !== 'undefined' ? window.location : { pathname: '/' },
    }}>
      {children}
    </RouterContext.Provider>
  );
};

// Create a mock Routes component
export const Routes = ({ children }) => {
  return <>{children}</>;
};

// Create a mock Route component
export const Route = ({ path, element }) => {
  return null; // This won't be rendered in Next.js
};

// Create a mock Navigate component
export const Navigate = ({ to }) => {
  if (typeof window !== 'undefined') {
    window.location.href = to;
  }
  return null;
};

// Create a mock useLocation hook
export const useLocation = () => {
  return typeof window !== 'undefined' ? window.location : { pathname: '/' };
};

// Create a mock useNavigate hook
export const useNavigate = () => {
  return (to) => {
    if (typeof window !== 'undefined') {
      window.location.href = to;
    }
  };
};

// Create a mock useParams hook
export const useParams = () => {
  return {};
};

// Create a mock useSearchParams hook
export const useSearchParams = () => {
  return [new URLSearchParams(), () => {}];
};

// Create a mock Outlet component
export const Outlet = () => {
  return null;
};