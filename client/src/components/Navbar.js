import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Sun, Moon, Menu, X, ShoppingCart, Search,
  Phone, MapPin, Heart, User
} from "lucide-react";

const Navbar = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const isAr = i18n.language?.startsWith("ar");

  // Sync theme state on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus search on open
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const toggleDarkMode = () => {
    const next = !darkMode;
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", next ? "dark" : "light");
    setDarkMode(next);
  };

  const toggleLanguage = () => {
    const next = isAr ? "en" : "ar";
    i18n.changeLanguage(next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/", label: isAr ? "الرئيسية" : "Home" },
    { to: "/products", label: isAr ? "الأدوية والمنتجات" : "Products" },
    { to: "/prescriptions", label: isAr ? "الوصفات الطبية" : "Prescriptions" },
    { to: "/about", label: isAr ? "من نحن" : "About" },
    { to: "/contact", label: isAr ? "تواصل معنا" : "Contact" },
  ];

  return (
    <>
      {/* ── Top Utility Bar ─────────────────────────────── */}
      <div className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="tel:+966172530257" className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
              <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span dir="ltr">+966 17 253 0257</span>
            </a>
            <span className="hidden sm:flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer font-medium">
              <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? "المملكة العربية السعودية" : "Saudi Arabia"}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-700 dark:text-emerald-400 font-extrabold text-[11px] sm:text-xs">
              {isAr ? "✦ توصيل مجاني فوق ١٠٠ ريال" : "✦ Free delivery over SAR 100"}
            </span>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-bold"
            >
              🌐 {isAr ? "English" : "العربية"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ─────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-lg border-b border-slate-200 dark:border-slate-800/80"
            : "bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative h-11 w-11 rounded-2xl overflow-hidden bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/images/logo.png"
                  alt="Awon Pharmacy"
                  className="h-10 w-auto object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="leading-tight">
                <span className="block text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  {isAr ? "صيدلية عون" : "Awon Pharmacy"}
                </span>
                <span className="block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
                  {isAr ? "القحطاني" : "Al-Qahtani"}
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-4 py-2 text-sm font-extrabold rounded-xl transition-all duration-200 ${
                    isActive(to)
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
                      : "text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70"
                  }`}
                >
                  {label}
                  {isActive(to) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-emerald-500" />
                  )}
                </Link>
              ))}
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Dark / Light Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                aria-label="Toggle Light/Dark Theme"
                title={darkMode ? "التحويل للوضع النهارى" : "التحويل للوضع الليلى"}
              >
                {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-0.5 -end-0.5 h-4.5 w-4.5 rounded-full bg-emerald-500 text-[10px] font-black text-slate-950 flex items-center justify-center leading-none">
                  0
                </span>
              </Link>

              {/* Account CTA */}
              <Link
                to="/profile"
                className="hidden md:inline-flex items-center gap-2 ms-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 text-xs sm:text-sm font-black transition-all duration-200 hover:scale-105 shadow-md shadow-emerald-500/20"
              >
                <User className="h-4 w-4" />
                <span>{isAr ? "حسابي" : "My Account"}</span>
              </Link>

              {/* Mobile Hamburger */}
              <button
                className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* ── Search Dropdown ── */}
          {searchOpen && (
            <div className="pb-4 border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="relative">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  ref={searchRef}
                  type="search"
                  placeholder={isAr ? "ابحث عن دواء أو مستحضر أو قسم..." : "Search medication, product, or category..."}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl ps-11 pe-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-2xl">
            <nav className="flex flex-col gap-1.5 mb-4">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-extrabold transition-all ${
                    isActive(to)
                      ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "text-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={toggleDarkMode} className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
                </button>
                <button onClick={toggleLanguage} className="h-10 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-black">
                  {isAr ? "English" : "العربية"}
                </button>
              </div>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-slate-950 px-5 py-2.5 text-sm font-black"
              >
                <User className="h-4 w-4" />
                {isAr ? "حسابي" : "My Account"}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
