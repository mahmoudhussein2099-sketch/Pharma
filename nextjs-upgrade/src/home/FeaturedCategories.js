import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FeaturedCategories = () => {
  const { t } = useTranslation();
  
  const categories = [
    { 
      id: 'medications', 
      name: t('medications'), 
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae'
    },
    { 
      id: 'vitamins', 
      name: t('vitaminsSupplements'), 
      image: 'https://images.unsplash.com/photo-1577460551100-907ba84418ce'
    },
    { 
      id: 'personal-care', 
      name: t('personalCare'), 
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908'
    },
    { 
      id: 'baby-care', 
      name: t('babyCare'), 
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4'
    },
    { 
      id: 'medical-equipment', 
      name: t('medicalEquipment'), 
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8'
    }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {t('shopByCategory')}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/categories/${category.id}`}
              className="group"
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-square mb-3 relative">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-white font-bold p-4">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;