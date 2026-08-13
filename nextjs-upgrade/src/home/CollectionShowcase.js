import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CollectionShowcase = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: t('allCollections') },
    { id: 'medications', name: t('medications') },
    { id: 'vitamins', name: t('vitaminsSupplements') },
    { id: 'skincare', name: t('skinCare') },
    { id: 'babycare', name: t('babyCare') }
  ];
  
  const collections = [
    {
      id: 1,
      name: t('painReliefCollection'),
      image: 'https://images.unsplash.com/photo-1550572017-edd951b55104',
      category: 'medications',
      itemCount: 24
    },
    {
      id: 2,
      name: t('vitaminCCollection'),
      image: 'https://images.unsplash.com/photo-1606771694891-2c6a7e9f3711',
      category: 'vitamins',
      itemCount: 18
    },
    {
      id: 3,
      name: t('faceCareCollection'),
      image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48',
      category: 'skincare',
      itemCount: 32
    },
    {
      id: 4,
      name: t('babyEssentialsCollection'),
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4',
      category: 'babycare',
      itemCount: 28
    },
    {
      id: 5,
      name: t('diabeticCareCollection'),
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
      category: 'medications',
      itemCount: 15
    },
    {
      id: 6,
      name: t('immuneSupportCollection'),
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843',
      category: 'vitamins',
      itemCount: 22
    }
  ];
  
  const filteredCollections = activeCategory === 'all' 
    ? collections 
    : collections.filter(collection => collection.category === activeCategory);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('exploreCollections')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('exploreCollectionsDesc')}
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-10">
          <div className="inline-flex bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === category.id
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map(collection => (
            <div 
              key={collection.id}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="aspect-w-16 aspect-h-9 h-64">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-teal-300 transition-colors duration-200">
                  {collection.name}
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  {collection.itemCount} {t('items')}
                </p>
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {t('viewCollection')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full shadow-lg transition-colors duration-200 inline-flex items-center">
            {t('viewAllCollections')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollectionShowcase;