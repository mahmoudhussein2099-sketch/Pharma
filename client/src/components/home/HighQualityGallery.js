import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const HighQualityGallery = () => {
  const { t } = useTranslation();
  const [activeImage, setActiveImage] = useState(0);
  
  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3',
      alt: 'Modern pharmacy interior',
      title: t('modernPharmacy'),
      description: t('modernPharmacyDesc')
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1634401426842-3e5e1c23b7b5',
      alt: 'Professional pharmacist',
      title: t('professionalPharmacists'),
      description: t('professionalPharmacistsDesc')
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1579154204914-29dd9e2c8261',
      alt: 'Advanced laboratory',
      title: t('advancedLab'),
      description: t('advancedLabDesc')
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1622037022824-0c71d511ef3c',
      alt: 'Fast delivery service',
      title: t('fastDelivery'),
      description: t('fastDeliveryDesc')
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('experienceExcellence')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('experienceExcellenceDesc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]">
            <img 
              src={images[activeImage].src} 
              alt={images[activeImage].alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">{images[activeImage].title}</h3>
              <p className="text-white/90">{images[activeImage].description}</p>
            </div>
          </div>
          
          {/* Thumbnails and Text */}
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button 
                  key={image.id}
                  onClick={() => setActiveImage(index)}
                  className={`relative rounded-lg overflow-hidden h-24 ${
                    activeImage === index ? 'ring-4 ring-teal-500' : 'opacity-70 hover:opacity-100'
                  } transition-all duration-300`}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t('whyChooseUs')}
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{t('qualityMedicines')}</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{t('expertPharmacists')}</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{t('fastDeliveryService')}</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{t('affordablePrices')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighQualityGallery;