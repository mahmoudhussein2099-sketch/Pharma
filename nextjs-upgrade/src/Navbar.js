import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Menu, X, ShoppingCart } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "ar" : i18n.language === "ar" ? "hi" : "en";
    i18n.changeLanguage(nextLang);
    document.documentElement.dir = nextLang === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
    if (i18n.language === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [i18n.language]);

  const navLink = (to, label) => (
    <Link
      to={to}
      onClick={() => setMobileOpen(false)} // Close mobile menu on link click
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        location.pathname === to
          ? "bg-teal-50 text-teal-700 dark:bg-gray-800 dark:text-white"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-sm sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Awon Pharmacy Logo" className="h-16 w-auto" />
          <span className="font-bold text-teal-700 dark:text-white text-2xl">
            {t('awon') || 'Awon'}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLink("/", t("home"))}
          {navLink("/products", t("products"))}
          {navLink("/contact", t("contactUs"))}
        </nav>
        
        {/* Right side controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="text-sm font-medium text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-white"
            aria-label="Toggle Language"
          >
            🌐 {i18n.language === "en" ? "العربية" : i18n.language === "ar" ? "हिन्दी" : "English"}
          </button>

          {/* Dark Mode */}
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Toggle Dark Mode">
            {darkMode ? (
              <Sun className="w-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 text-gray-400" />
            )}
          </button>

          {/* Cart */}
          <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Shopping Cart">
            <ShoppingCart className="w-5 text-gray-600 dark:text-gray-300" />
          </Link>

          {/* User Login/Profile */}
          <Link to="/profile" className="bg-teal-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors">
            {t('myAccount') || 'My Account'}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open Menu">
          {mobileOpen ? <X className="text-gray-700 dark:text-gray-200" /> : <Menu className="text-gray-700 dark:text-gray-200" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 px-4 pt-2 pb-4 flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800">
          {navLink("/", t("home"))}
          {navLink("/products", t("products"))}
          {navLink("/contact", t("contactUs"))}
          <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={toggleLanguage} className="text-sm font-medium text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-white">
                🌐 {i18n.language === "en" ? "AR" : i18n.language === "ar" ? "HI" : "EN"}
              </button>
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                {darkMode ? <Sun className="w-5 text-yellow-400" /> : <Moon className="w-5 text-gray-400" />}
              </button>
            </div>
            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ShoppingCart className="w-5 text-gray-600 dark:text-gray-300" />
            </Link>
          </div>
          <Link to="/profile" className="w-full mt-2 bg-teal-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors text-center">
            {t('myAccount') || 'My Account'}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
