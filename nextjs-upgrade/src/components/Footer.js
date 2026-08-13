import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Logo & Description */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Awon Pharmacy" className="h-8" />
              <span className="font-bold text-teal-700 dark:text-white text-xl">
                Awon
              </span>
            </Link>
            <p className="text-sm">{t("footer.description")}</p>
          </div>

        {/* Quick Links */}
        <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase mb-4">
            {t("footer.quickLinks")}
          </h3>
          <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-teal-600 dark:hover:text-white">{t("products")}</Link></li>
              <li><Link to="/about" className="hover:text-teal-600 dark:hover:text-white">{t("aboutUs")}</Link></li>
              <li><Link to="/faq" className="hover:text-teal-600 dark:hover:text-white">{t("faq")}</Link></li>
              <li><Link to="/contact" className="hover:text-teal-600 dark:hover:text-white">{t("contactUs")}</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase mb-4">
            {t("footer.services")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-teal-600 dark:hover:text-white cursor-pointer">{t("services.delivery")}</li>
            <li className="hover:text-teal-600 dark:hover:text-white cursor-pointer">{t("services.aiSupport")}</li>
            <li className="hover:text-teal-600 dark:hover:text-white cursor-pointer">{t("services.consultation")}</li>
            <li className="hover:text-teal-600 dark:hover:text-white cursor-pointer">{t("services.healthcare")}</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase mb-4">
            {t("footer.contact")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Riyadh, Saudi Arabia</li>
            <li>📞 +966 555 123 456</li>
            <li>✉️ info@awonpharmacy.sa</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase mb-4">
            {t('legal') || 'Legal'}
          </h3>
          <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-teal-600 dark:hover:text-white">{t("privacyPolicy")}</Link></li>
              <li><Link to="/terms" className="hover:text-teal-600 dark:hover:text-white">{t("termsOfService")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-200 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-xs">
          <p>© {new Date().getFullYear()} Awon Al Qhtany Pharmacy. {t("footer.rights")}</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <p>{t('securePayments')}</p>
            {/* Payment icons can go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
