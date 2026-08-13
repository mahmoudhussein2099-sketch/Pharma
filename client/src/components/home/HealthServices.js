import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HealthServices = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      id: 'vaccinations',
      name: t('vaccinations'),
      description: t('vaccinationsDesc'),
      image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'health-checks',
      name: t('healthChecks'),
      description: t('healthChecksDesc'),
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'consultations',
      name: t('consultations'),
      description: t('consultationsDesc'),
      image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'chronic-medication',
      name: t('chronicMedication'),
      description: t('chronicMedicationDesc'),
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('healthServices')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('healthServicesTagline')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(service => (
            <Link 
              key={service.id}
              to={`/services/${service.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg h-80 transform transition-transform duration-300 hover:scale-105"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <p className="text-white/90">{service.description}</p>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm font-medium">
                    {t('learnMore')}
                  </span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/services"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-300"
          >
            {t('viewAllServices')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HealthServices;