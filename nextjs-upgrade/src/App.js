import React from 'react';
// Use our custom router components instead of react-router-dom
import { BrowserRouter as Router, Routes, Route, Navigate } from '../react-router-dom';
import './styles/AdminStyles.css';

// Import user pages
import HomePage from './pages/user/HomePage';
import ProductPage from './pages/user/ProductPage';
import ProductDetailPage from './pages/user/ProductDetailPage';
import UserDashboard from './pages/user/UserDashboard';
import DashboardPage from './pages/user/DashboardPage';
import CheckoutPage from './pages/user/CheckoutPage';
import CategoriesPage from './pages/user/CategoriesPage';
import PrescriptionsPage from './pages/user/PrescriptionsPage';
import ContactPage from './pages/user/ContactPage';
import LoginPage from './pages/user/LoginPage';
import HelpPage from './pages/user/HelpPage';

// Import admin pages
import AdminLoginAdapter from './pages/admin/AdminLoginAdapter';
import UnifiedDashboard from './pages/admin/UnifiedDashboard';

// Import components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Import contexts
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SecurityProvider } from './context/SecurityContext';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <SecurityProvider>
            <AuthProvider>
              <ProductProvider>
                <CartProvider>
                  <Routes>
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLoginAdapter />} />
                    <Route path="/admin/*" element={
                      <div className="admin-page-container">
                        <UnifiedDashboard />
                      </div>
                    } />
                    
                    {/* User Routes */}
                    <Route path="/" element={
                      <>
                        <Header />
                        <main className="flex-grow">
                          <HomePage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/products" element={
                      <>
                        <Header />
                        <main className="flex-grow">
                          <ProductPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/products/:id" element={
                      <>
                        <Header />
                        <main className="flex-grow">
                          <ProductDetailPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/dashboard/*" element={<UserDashboard />} />
                    <Route path="/checkout" element={
                      <>
                        <Header />
                        <main className="flex-grow">
                          <CheckoutPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/categories" element={
                      <>
                        <Header />
                        <main className="flex-grow">
                          <CategoriesPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/prescriptions" element={
                      <>
                        <Header />
                        <main className="flex-grow">
                          <PrescriptionsPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/contact" element={
                      <>
                        <Header />
                        <main className="flex-grow">
                          <ContactPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/help" element={
                      <>
                        <Header />
                        <main className="flex-grow">
                          <HelpPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/login" element={
                      <>
                        <Header />
                        <main className="flex-grow">
                          <LoginPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    
                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </CartProvider>
              </ProductProvider>
            </AuthProvider>
          </SecurityProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;