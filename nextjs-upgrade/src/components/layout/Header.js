import React, { useState, useEffect } from 'react';
import Link from '../Link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import LanguageSwitcher from '../LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const { cartCount } = useCart();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('adminToken');
    }
    setUser(null);
    router.push('/');
  };
  
  const navLinks = [
    { name: t('home', 'Home'), path: '/' },
    { name: t('products', 'Products'), path: '/products' },
    { name: t('categories', 'Categories'), path: '/categories' },
    { name: t('prescriptions', 'Prescriptions'), path: '/prescriptions' },
    { name: t('contact', 'Contact'), path: '/contact' },
    { name: t('help', 'Help'), path: '/help' }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-teal-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center text-sm">
            <div className="flex items-center mr-6">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="hidden md:flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@awonpharmacy.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/help" className="text-sm hover:text-teal-200 transition-colors">
              {t('help', 'Help')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <svg className="w-10 h-10 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.447 9.72l-5.447-5.72-5.447 5.72-5.553 1.276 5 5.019-1.553 6.985 7.553-3 7.553 3-1.553-6.985 5-5.019z" />
            </svg>
            <span className="ml-2 text-2xl font-bold text-gray-900">Awon</span>
            <span className="text-2xl font-light text-teal-600">Pharmacy</span>
          </Link>
          
          <div className={`${searchOpen ? 'flex' : 'hidden md:flex'} flex-1 max-w-xl mx-4`}>
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder={t('searchPlaceholder', 'Search for products...')} 
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 hidden group-hover:block">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-sm text-gray-500">
                      {user.email}
                    </div>
                    <div className="border-t border-gray-200 my-1"></div>
                    {user.role === 'admin' ? (
                      <Link href="/admin/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        {t('adminDashboard', 'Admin Dashboard')}
                      </Link>
                    ) : (
                      <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        {t('dashboard', 'Dashboard')}
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {t('logout', 'Logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      {t('login', 'Login')}
                    </Link>
                    <Link href="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      {t('register', 'Register')}
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <Link href="/admin/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      {t('adminLogin', 'Admin Login')}
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <Link href="/wishlist" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            
            <Link href="/checkout" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <nav className="hidden md:block bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <ul className="flex">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  href={link.path} 
                  className={`block py-4 px-4 font-medium hover:text-teal-600 transition-colors ${
                    router.pathname === link.path ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path} 
                    className={`block py-2 px-4 rounded-lg font-medium ${
                      router.pathname === link.path 
                        ? 'bg-teal-100 text-teal-800' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {!user && (
                <>
                  <li>
                    <Link 
                      href="/login" 
                      className="block py-2 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('login', 'Login')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/login" 
                      className="block py-2 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('adminLogin', 'Admin Login')}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;