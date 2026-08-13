import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import user pages
import HomePage from './pages/user/HomePage';
import ProductsPage from './pages/user/ProductsPage';
import ProductDetailPage from './pages/user/ProductDetailPage';
import UserDashboard from './pages/user/UserDashboard';
import DashboardPage from './pages/user/DashboardPage';
import CheckoutPage from './pages/user/CheckoutPage';
import CartPage from './pages/user/CartPage';
import CategoriesPage from './pages/user/CategoriesPage';
import PrescriptionsPage from './pages/user/PrescriptionsPage';
import ContactPage from './pages/user/ContactPage';
import AboutPage from './pages/user/AboutPage';
import ServicesPage from './pages/user/ServicesPage';
import ServiceDetailPage from './pages/user/ServiceDetailPage';
import TeamPage from './pages/user/TeamPage';
import LocationPage from './pages/user/LocationPage';
import FaqPage from './pages/user/FaqPage';
import LoginPage from './pages/user/LoginPage';
import HelpPage from './pages/user/HelpPage';
import WishlistPage from './pages/user/WishlistPage';
import NotFoundPage from './pages/user/NotFoundPage';

// Import admin pages
import AdminLoginAdapter from './pages/admin/AdminLoginAdapter';
import UnifiedDashboard from './pages/admin/UnifiedDashboard';

// Import components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PwaInstallButton from './components/PwaInstallButton';

// Import contexts
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SecurityProvider } from './context/SecurityContext';
import { ProductProvider } from './context/ProductContext';
import { WishlistProvider } from './context/WishlistContext';

const RequireAdmin = ({ children }) => {
  if (typeof window === 'undefined') return children;
  const token = window.localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

function NextApp() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SecurityProvider>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <WishlistProvider>
                  <Routes>
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLoginAdapter />} />
                    <Route path="/admin/*" element={
                      <RequireAdmin>
                        <div className="admin-page-container">
                          <UnifiedDashboard />
                        </div>
                      </RequireAdmin>
                    } />
                    
                    {/* User Routes */}
                    <Route path="/" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <HomePage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/products" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <ProductsPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/products/:id" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
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
                        <main id="main-content" className="flex-grow">
                          <CheckoutPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/cart" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <CartPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/categories" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <CategoriesPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/prescriptions" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <PrescriptionsPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/contact" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <ContactPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/about" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <AboutPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/services" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <ServicesPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/services/:id" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <ServiceDetailPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/team" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <TeamPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/location" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <LocationPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/faq" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <FaqPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/help" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <HelpPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    <Route path="/login" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <LoginPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    
                    <Route path="/wishlist" element={
                      <>
                        <Header />
                        <main id="main-content" className="flex-grow">
                          <WishlistPage />
                        </main>
                        <Footer />
                      </>
                    } />
                    
                    {/* Catch all route */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                  <PwaInstallButton />
                </WishlistProvider>
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </SecurityProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default NextApp;