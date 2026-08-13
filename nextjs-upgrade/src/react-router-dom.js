// This file serves as a drop-in replacement for 'react-router-dom'
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  Routes,
  Route,
  Navigate
} from './components/router';

// BrowserRouter is a no-op in Next.js
const BrowserRouter = ({ children }) => children;

// Export all the components and hooks
export {
  BrowserRouter,
  Link,
  useLocation,
  useNavigate,
  useParams,
  Routes,
  Route,
  Navigate
};