import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Play, Apple } from 'lucide-react';
import CategoryDirectory from './CategoryDirectory';

const Footer = () => {
  const { t } = useTranslation();

  const linkClass = 'text-muted-foreground/70 transition-colors hover:text-primary';

  return (
    <footer className="border-t border-border bg-card">
      {/* Gradient accent top border strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

      {/* Full categories directory */}
      <CategoryDirectory />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link to="/" className="mb-4 flex items-center" aria-label="Awon Pharmacy">
              <img
                src="/images/logo.svg"
                alt="Awon Pharmacy"
                className="h-12 w-auto rounded-lg object-contain"
                width={160}
                height={48}
              />
              <div className="ms-2 leading-tight">
                <span className="block text-xl font-bold text-foreground">Awon</span>
                <span className="block text-xs font-medium text-primary">Pharmacy</span>
              </div>
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('footerTagline', 'Your trusted healthcare partner since 2023.')}
            </p>

            {/* App download badges */}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                <Play className="h-4 w-4" aria-hidden="true" />
                <span>
                  <span className="block text-[10px] font-normal leading-tight text-muted-foreground">GET IT ON</span>
                  Google Play
                </span>
              </a>
              <a
                href="https://www.apple.com/app-store"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                <Apple className="h-4 w-4" aria-hidden="true" />
                <span>
                  <span className="block text-[10px] font-normal leading-tight text-muted-foreground">DOWNLOAD ON</span>
                  App Store
                </span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('quickLinks', 'Quick Links')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className={linkClass}>{t('home', 'Home')}</Link></li>
              <li><Link to="/products" className={linkClass}>{t('products', 'Products')}</Link></li>
              <li><Link to="/categories" className={linkClass}>{t('categories', 'Categories')}</Link></li>
              <li><Link to="/prescriptions" className={linkClass}>{t('prescriptions', 'Prescriptions')}</Link></li>
              <li><Link to="/about" className={linkClass}>{t('about', 'About Us')}</Link></li>
              <li><Link to="/contact" className={linkClass}>{t('contact', 'Contact')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('services', 'Services')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/vaccinations" className={linkClass}>{t('vaccinations', 'Vaccinations')}</Link></li>
              <li><Link to="/services/health-checks" className={linkClass}>{t('healthChecks', 'Health Checks')}</Link></li>
              <li><Link to="/services/consultations" className={linkClass}>{t('consultations', 'Consultations')}</Link></li>
              <li><Link to="/services/chronic-medication" className={linkClass}>{t('chronicMedication', 'Chronic Medication')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('contactUs', 'Contact Us')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="font-medium text-foreground/80">
                  {t('fullAddress', '3RV5+56J, Main Street, Al Wadeen 62263, Saudi Arabia')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a
                  href="tel:+966172530257"
                  className="font-medium text-foreground/80 transition-colors hover:text-primary"
                  dir="ltr"
                >
                  +966 17 253 0257
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="font-medium text-foreground/80">
                  info@awonpharmacy.com
                </span>
              </li>
            </ul>

            <Link
              to="/location"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-semibold text-white shadow transition-all duration-300 hover:scale-105"
            >
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {t('locationHeroTitle', 'Awon Pharmacy Location')}
            </Link>
          </div>
        </div>

        {/* Mini map strip */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-lg">
          <div className="relative h-64 w-full">
            <iframe
              title={t('featuredStore', 'Store Location')}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=3RV5%2B56J%20Al%20Wadeen%2062263%20Saudi%20Arabia&z=15&output=embed"
              className="absolute inset-0"
            />
            <div className="absolute bottom-3 start-3 rounded-xl border border-border bg-background px-4 py-2.5 shadow-lg backdrop-blur-sm">
              <p className="text-xs font-bold text-foreground">
                {t('storeName', 'Awon Pharmacy')} - {t('alWadeen', 'Al Wadeen')}
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=3RV5%2B56J%20Al%20Wadeen%2062263%20Saudi%20Arabia"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-secondary"
              >
                {t('openInMaps', 'Open in Google Maps')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Awon Pharmacy. {t('allRightsReserved', 'All rights reserved.')}
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              {t('termsOfService', 'Terms of Service')}
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              {t('privacyPolicy', 'Privacy Policy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
