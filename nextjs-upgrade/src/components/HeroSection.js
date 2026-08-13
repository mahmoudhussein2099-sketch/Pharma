import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import heroImage from "../assets/saudi-pharmacy-hero.png";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-100 to-white dark:from-gray-900 dark:to-gray-800 transition duration-500"
    >
      {/* Blurred glowing background effect */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-teal-300 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] bg-teal-500 opacity-20 rounded-full blur-2xl animate-ping" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 py-12 text-center md:text-left grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 leading-tight">
            {t("homepage.title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {t("homepage.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/products"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
            >
              {t("shopNow")}
            </Link>
            <Link
              to="/contact"
              className="border border-teal-600 text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-900 font-semibold py-2 px-6 rounded-lg transition"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={heroImage}
            alt="Pharmacy Preview"
            className="w-[320px] md:w-[400px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
