import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaHeartbeat, FaBaby, FaSun, FaBrain } from 'react-icons/fa';

const concerns = [
  { name: 'Heart Health', icon: <FaHeartbeat className="mx-auto text-4xl" /> },
  { name: 'Baby Care', icon: <FaBaby className="mx-auto text-4xl" /> },
  { name: 'Skin & Sun Care', icon: <FaSun className="mx-auto text-4xl" /> },
  { name: 'Vitamins & Mind', icon: <FaBrain className="mx-auto text-4xl" /> },
];

const ShopByConcern = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          {t('shopByConcern') || 'Shop by Health Concern'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {concerns.map((concern) => (
            <div
              key={concern.name}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
            >
              <div className="text-teal-500 mb-4">{concern.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t(concern.name) || concern.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByConcern;