import React from 'react';
import Link from './Link';
import { useRouter } from 'next/router';

// Create a compatibility layer for react-router-dom hooks
const useLocation = () => {
  const router = useRouter();
  return {
    pathname: router.pathname,
    search: router.asPath.includes('?') ? router.asPath.substring(router.asPath.indexOf('?')) : '',
    hash: router.asPath.includes('#') ? router.asPath.substring(router.asPath.indexOf('#')) : '',
  };
};

const useNavigate = () => {
  const router = useRouter();
  return (to) => router.push(to);
};

const useParams = () => {
  const router = useRouter();
  return router.query || {};
};

// Mock components that aren't needed in Next.js
const Routes = ({ children }) => children;
const Route = () => null;
const Navigate = ({ to }) => {
  const router = useRouter();
  React.useEffect(() => {
    router.push(to);
  }, []);
  return null;
};

export {
  Link,
  useLocation,
  useNavigate,
  useParams,
  Routes,
  Route,
  Navigate
};