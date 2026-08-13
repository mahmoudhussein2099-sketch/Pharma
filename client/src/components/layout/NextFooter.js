import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const NextFooter = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-teal-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.447 9.72l-5.447-5.72-5.447 5.72-5.553 1.276 5 5.019-1.553 6.985 7.553-3 7.553 3-1.553-6.985 5-5.019z" />
              </svg>
              <span className="text-xl font-bold">Awon Pharmacy</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t('footerTagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 1.802c-3.147 0-3.518.012-4.761.069-2.938.134-4.25 1.444-4.385 4.385-.057 1.243-.069 1.614-.069 4.761 0 3.148.012 3.518.069 4.761.135 2.938 1.444 4.25 4.385 4.386 1.243.057 1.614.069 4.761.069 3.148 0 3.519-.012 4.762-.069 2.938-.135 4.25-1.444 4.386-4.386.057-1.243.069-1.614.069-4.762 0-3.147-.012-3.518-.069-4.761-.136-2.937-1.447-4.25-4.386-4.385-1.243-.057-1.614-.069-4.762-.069zm0 1.08c3.487 0 3.892.013 5.268.076 3.184.146 4.545 1.528 4.691 4.691.063 1.376.076 1.781.076 5.268s-.013 3.892-.076 5.268c-.146 3.184-1.528 4.545-4.691 4.691-1.376.063-1.781.076-5.268.076s-3.892-.013-5.268-.076c-3.184-.146-4.545-1.528-4.691-4.691-.063-1.376-.076-1.781-.076-5.268s.013-3.892.076-5.268c.146-3.184 1.528-4.545 4.691-4.691 1.376-.063 1.781-.076 5.268-.076zm0 2.028a4.79 4.79 0 100 9.58 4.79 4.79 0 000-9.58zm0 1.802a2.988 2.988 0 110 5.976 2.988 2.988 0 010-5.976zm5.538-.527a1.12 1.12 0 110 2.24 1.12 1.12 0 010-2.24z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-white">
                  {t('categories')}
                </Link>
              </li>
              <li>
                <Link href="/prescriptions" className="text-gray-400 hover:text-white">
                  {t('prescriptions')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/vaccinations" className="text-gray-400 hover:text-white">
                  {t('vaccinations')}
                </Link>
              </li>
              <li>
                <Link href="/services/health-checks" className="text-gray-400 hover:text-white">
                  {t('healthChecks')}
                </Link>
              </li>
              <li>
                <Link href="/services/consultations" className="text-gray-400 hover:text-white">
                  {t('consultations')}
                </Link>
              </li>
              <li>
                <Link href="/services/chronic-medication" className="text-gray-400 hover:text-white">
                  {t('chronicMedication')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('contactUs')}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-teal-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">
                  123 Main Street, Riyadh, Saudi Arabia
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-teal-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400">
                  +966 123 456 7890
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-teal-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400">
                  info@awonpharmacy.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Awon Pharmacy. {t('allRightsReserved')}
          </p>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              {t('termsOfService')}
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              {t('privacyPolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NextFooter;