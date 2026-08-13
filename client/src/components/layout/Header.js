import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, User, Heart, ShoppingCart, Menu, X, Phone, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Submit the header search: go to the products page with the query applied.
  const submitSearch = (e) => {
    e?.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/products?search=${encodeURIComponent(q)}`);
    setSearchQuery('');
    setSearchOpen(false);
  };
  
  // Get cart count from context
  const { cartCount } = useCart();
  
  // Get wishlist count from context
  const { wishlistCount } = useWishlist();
  
  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    if (window.confirm(t('logoutConfirm', 'Are you sure you want to log out?'))) {
      localStorage.removeItem('user');
      localStorage.removeItem('adminToken'); // Also remove admin token
      setUser(null);
      navigate('/');
    }
  };
  
  // Navigation links
  const navLinks = [
    { name: t('home', 'Home'), path: '/' },
    { name: t('products', 'Products'), path: '/products' },
    { name: t('categories', 'Categories'), path: '/categories' },
    { name: t('prescriptions', 'Prescriptions'), path: '/prescriptions' },
    { name: t('contact', 'Contact'), path: '/contact' },
    { name: t('help', 'Help'), path: '/help' }
  ];

  const iconButton =
    'p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-colors';

  const dropdownItem =
    'block w-full text-start px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors';

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md"
      >
        {t('skipToContent', 'Skip to content')}
      </a>

      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <a href="tel:+966172530257" dir="ltr" className="transition-colors hover:text-white">+966 17 253 0257</a>
            </div>
            <div className="hidden items-center gap-1.5 md:flex">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>info@awonpharmacy.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/help" className="text-sm text-primary-foreground/90 hover:text-white transition-colors">
              {t('help', 'Help')}
            </Link>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center" aria-label="Awon Pharmacy">
            <img
              src="/images/logo.svg"
              alt="Awon Pharmacy"
              className="h-11 w-auto rounded-lg object-contain"
              width={160}
              height={44}
            />
            <div className="ms-2 leading-tight">
              <span className="block text-xl font-bold text-foreground">Awon</span>
              <span className="block text-xs font-medium tracking-wide text-primary">Pharmacy</span>
            </div>
          </Link>
          
          {/* Search Bar */}
          <div className={cn('flex-1 max-w-xl', searchOpen ? 'flex' : 'hidden md:flex')}>
            <form onSubmit={submitSearch} className="relative w-full" role="search">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={t('searchPlaceholder', 'Search for products…')}
                placeholder={t('searchPlaceholder', 'Search for products…')} 
                className="w-full rounded-full border border-input bg-muted py-2 pe-10 ps-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="submit"
                aria-label={t('search', 'Search')}
                className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
          
          {/* Action Buttons */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label={t('search', 'Search')}
              aria-expanded={searchOpen}
              className={cn(iconButton, 'md:hidden')}
            >
              <Search className="h-6 w-6" />
            </button>
            
            {/* User Account */}
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-label={user ? t('account', 'Account') : t('login', 'Login')}
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
                className={iconButton}
              >
                <User className="h-6 w-6" />
              </button>
              
              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute end-0 z-10 mt-2 w-56 overflow-hidden rounded-lg border border-border bg-popover py-2 shadow-lg">
                  {user ? (
                    <>
                      <div className="border-b border-border px-4 py-2 text-sm text-muted-foreground">
                        {user.email}
                      </div>
                      {user.role === 'admin' ? (
                        <Link to="/admin/dashboard" className={dropdownItem} onClick={() => setUserMenuOpen(false)}>
                          {t('adminDashboard', 'Admin Dashboard')}
                        </Link>
                      ) : (
                        <Link to="/dashboard" className={dropdownItem} onClick={() => setUserMenuOpen(false)}>
                          {t('dashboard', 'Dashboard')}
                        </Link>
                      )}
                      <button 
                        onClick={handleLogout}
                        className={cn(dropdownItem, 'text-destructive hover:bg-destructive/10')}
                      >
                        {t('logout', 'Logout')}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className={dropdownItem} onClick={() => setUserMenuOpen(false)}>
                        {t('login', 'Login')}
                      </Link>
                      <Link to="/register" className={dropdownItem} onClick={() => setUserMenuOpen(false)}>
                        {t('register', 'Register')}
                      </Link>
                      <div className="my-1 border-t border-border"></div>
                      <Link to="/admin/login" className={dropdownItem} onClick={() => setUserMenuOpen(false)}>
                        {t('adminLogin', 'Admin Login')}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Wishlist */}
            <Link to="/wishlist" aria-label={t('wishlist', 'Wishlist')} className={cn(iconButton, 'relative')}>
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -end-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            {/* Cart */}
            <Link to="/cart" aria-label={t('cart', 'Cart')} className={cn(iconButton, 'relative')}>
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -end-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={t('menu', 'Menu')}
              aria-expanded={mobileMenuOpen}
              className={cn(iconButton, 'md:hidden')}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="hidden border-t border-border bg-background md:block" aria-label="Main navigation">
        <div className="container mx-auto px-4">
          <ul className="flex">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={cn(
                    'block border-b-2 px-4 py-4 font-medium transition-colors',
                    pathname === link.path
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-primary'
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto px-4 py-2">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={cn(
                      'block rounded-lg px-4 py-2 font-medium transition-colors',
                      pathname === link.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
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
                      to="/login" 
                      className="block rounded-lg px-4 py-2 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('login', 'Login')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/admin/login" 
                      className="block rounded-lg px-4 py-2 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
