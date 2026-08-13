import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserSidebar = () => {
  const { t } = useTranslation();
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const categories = [
    {
      id: 'prescription',
      name: t('prescriptionMedicines'),
      count: 7,
      color: 'bg-blue-500',
      items: [
        { name: t('antibiotics'), count: '45+' },
        { name: t('bloodPressure'), count: '32+' },
        { name: t('diabetesCare'), count: '28+' },
        { name: t('heartMedications'), count: '23+' },
        { name: t('painRelief'), count: '38+' },
        { name: t('antidepressants'), count: '15+' },
        { name: t('thyroidMedications'), count: '12+' }
      ]
    },
    {
      id: 'otc',
      name: t('overTheCounter'),
      count: 6,
      color: 'bg-green-500',
      items: [
        { name: t('coldFlu'), count: '25+' },
        { name: t('allergyRelief'), count: '18+' },
        { name: t('digestiveHealth'), count: '22+' },
        { name: t('sleepAids'), count: '8+' },
        { name: t('headacheRelief'), count: '15+' },
        { name: t('coughSyrups'), count: '12+' }
      ]
    },
    {
      id: 'vitamins',
      name: t('vitaminsSupplements'),
      count: 7,
      color: 'bg-orange-500',
      items: [
        { name: t('multivitamins'), count: '35+' },
        { name: t('vitaminD'), count: '20+' },
        { name: t('omega3'), count: '15+' },
        { name: t('probiotics'), count: '18+' },
        { name: t('proteinSupplements'), count: '25+' },
        { name: t('ironB12'), count: '22+' },
        { name: t('calcium'), count: '16+' }
      ]
    },
    {
      id: 'baby',
      name: t('babyMotherCare'),
      count: 6,
      color: 'bg-pink-500',
      items: [
        { name: t('babyFormula'), count: '15+' },
        { name: t('diapersWipes'), count: '30+' },
        { name: t('babySkincare'), count: '20+' },
        { name: t('feedingBottles'), count: '25+' },
        { name: t('maternityCare'), count: '18+' },
        { name: t('babyMedicines'), count: '12+' }
      ]
    },
    {
      id: 'beauty',
      name: t('beautyPersonalCare'),
      count: 7,
      color: 'bg-purple-500',
      items: [
        { name: t('skincareProducts'), count: '45+' },
        { name: t('hairCare'), count: '25+' },
        { name: t('oralCare'), count: '20+' },
        { name: t('bodyCare'), count: '30+' },
        { name: t('sunscreen'), count: '15+' },
        { name: t('antiAging'), count: '18+' },
        { name: t('deodorants'), count: '22+' }
      ]
    },
    {
      id: 'medical',
      name: t('medicalDevices'),
      count: 6,
      color: 'bg-teal-500',
      items: [
        { name: t('bloodPressureMonitors'), count: '8+' },
        { name: t('thermometers'), count: '12+' },
        { name: t('glucoseMeters'), count: '6+' },
        { name: t('pulseOximeters'), count: '5+' },
        { name: t('nebulizers'), count: '4+' },
        { name: t('weighingScales'), count: '10+' }
      ]
    },
    {
      id: 'firstaid',
      name: t('firstAidSafety'),
      count: 6,
      color: 'bg-red-500',
      items: [
        { name: t('bandagesGauze'), count: '25+' },
        { name: t('antiseptics'), count: '15+' },
        { name: t('faceMasks'), count: '20+' },
        { name: t('handSanitizers'), count: '18+' },
        { name: t('firstAidKits'), count: '8+' },
        { name: t('safetyEquipment'), count: '12+' }
      ]
    },
    {
      id: 'eye',
      name: t('eyeVisionCare'),
      count: 5,
      color: 'bg-indigo-500',
      items: [
        { name: t('contactLenses'), count: '30+' },
        { name: t('eyeDrops'), count: '20+' },
        { name: t('readingGlasses'), count: '25+' },
        { name: t('lensSolutions'), count: '15+' },
        { name: t('eyeCare'), count: '12+' }
      ]
    }
  ];

  return (
    <div className="w-80 bg-white shadow-xl h-screen overflow-y-auto">
      {/* Categories */}
      <div className="p-4">
        {categories.map(category => (
          <div key={category.id} className="mb-4">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                <span className="font-medium text-gray-900">{category.name}</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm mr-2">
                  {category.count}
                </span>
                <svg 
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedCategories[category.id] ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {expandedCategories[category.id] && (
              <div className="ml-6 mt-2 space-y-1">
                {category.items.map((item, index) => (
                  <Link
                    key={index}
                    to={`/products?category=${category.id}&subcategory=${item.name}`}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50 text-sm"
                  >
                    <span className="text-gray-700">{item.name}</span>
                    <span className="text-gray-500 text-xs">{item.count}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Order Section */}
      <div className="border-t border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">{t('quickOrder')}</h3>
        <Link
          to="/prescriptions"
          className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          {t('uploadPrescription')}
        </Link>
      </div>

      {/* License Info */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">{t('licensedPharmacy')}</h4>
          <p className="text-xs text-gray-600 mt-1">{t('mohLicense')}</p>
          <p className="text-xs text-gray-500">{t('certifiedSince')}</p>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;