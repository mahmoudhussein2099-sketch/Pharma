import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MegaMenu = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  
  // Category data with icons
  const categories = [
    {
      id: 'medications',
      name: t('medications'),
      icon: '💊',
      subcategories: [
        { id: 'pain-relief', name: t('painRelief') },
        { id: 'cold-flu', name: t('coldAndFlu') },
        { id: 'allergy', name: t('allergy') },
        { id: 'digestive', name: t('digestiveHealth') },
        { id: 'antibiotics', name: t('antibiotics') }
      ]
    },
    {
      id: 'vitamins',
      name: t('vitaminsSupplements'),
      icon: '🍊',
      subcategories: [
        { id: 'multivitamins', name: t('multivitamins') },
        { id: 'vitamin-c', name: t('vitaminC') },
        { id: 'vitamin-d', name: t('vitaminD') },
        { id: 'minerals', name: t('minerals') },
        { id: 'fish-oil', name: t('fishOil') }
      ]
    },
    {
      id: 'personal-care',
      name: t('personalCare'),
      icon: '🧴',
      subcategories: [
        { id: 'skin-care', name: t('skinCare') },
        { id: 'hair-care', name: t('hairCare') },
        { id: 'oral-care', name: t('oralCare') },
        { id: 'bath-body', name: t('bathAndBody') },
        { id: 'deodorants', name: t('deodorants') }
      ]
    },
    {
      id: 'baby-care',
      name: t('babyCare'),
      icon: '👶',
      subcategories: [
        { id: 'baby-food', name: t('babyFood') },
        { id: 'diapers', name: t('diapers') },
        { id: 'baby-bath', name: t('babyBath') },
        { id: 'baby-accessories', name: t('babyAccessories') },
        { id: 'baby-formula', name: t('babyFormula') }
      ]
    },
    {
      id: 'medical-equipment',
      name: t('medicalEquipment'),
      icon: '🩺',
      subcategories: [
        { id: 'blood-pressure', name: t('bloodPressure') },
        { id: 'glucose-monitors', name: t('glucoseMonitors') },
        { id: 'thermometers', name: t('thermometers') },
        { id: 'first-aid', name: t('firstAid') },
        { id: 'mobility-aids', name: t('mobilityAids') }
      ]
    },
    {
      id: 'health-services',
      name: t('healthServices'),
      icon: '🏥',
      subcategories: [
        { id: 'vaccinations', name: t('vaccinations') },
        { id: 'health-checks', name: t('healthChecks') },
        { id: 'consultations', name: t('consultations') },
        { id: 'chronic-medication', name: t('chronicMedication') }
      ]
    }
  ];

  // Featured products
  const featuredProducts = [
    { id: 1, name: t('panadolExtra'), price: 'SAR 15.50', image: '/images/products/panadol.png' },
    { id: 2, name: t('vitaminCComplex'), price: 'SAR 45.00', image: '/images/products/vitamin-c.png' }
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-50">
      <div className="container mx-auto p-6">
        <div className="flex">
          {/* Categories */}
          <div className="w-3/4 grid grid-cols-3 gap-6">
            {categories.map(category => (
              <div key={category.id} className="mb-6">
                <Link 
                  to={`/categories/${category.id}`}
                  className="flex items-center text-lg font-bold text-gray-800 dark:text-white mb-3 hover:text-teal-600 dark:hover:text-teal-400"
                >
                  <span className="mr-2 text-2xl">{category.icon}</span>
                  {category.name}
                </Link>
                <ul className="space-y-2">
                  {category.subcategories.map(sub => (
                    <li key={sub.id}>
                      <Link 
                        to={`/categories/${category.id}/${sub.id}`}
                        className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Featured Section */}
          <div className="w-1/4 pl-6 border-l border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {t('featuredProducts')}
            </h3>
            <div className="space-y-4">
              {featuredProducts.map(product => (
                <Link key={product.id} to={`/products/${product.id}`} className="block group">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                        {product.name}
                      </h4>
                      <p className="text-sm text-teal-600 dark:text-teal-400">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg">
              <h3 className="text-sm font-bold text-teal-800 dark:text-teal-300 mb-2">
                {t('uploadPrescription')}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                {t('uploadPrescriptionDesc')}
              </p>
              <Link 
                to="/prescriptions"
                className="text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 px-3 py-2 rounded-lg inline-block"
              >
                {t('uploadNow')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-700 py-3">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex space-x-6">
            <Link to="/offers" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
              {t('specialOffers')}
            </Link>
            <Link to="/brands" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
              {t('shopByBrand')}
            </Link>
            <Link to="/new-arrivals" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
              {t('newArrivals')}
            </Link>
          </div>
          <button 
            onClick={onClose}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;