import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CategoriesShowcase = () => {
  const { t } = useTranslation();
  
  // Categories data
  const categories = [
    {
      id: 1,
      name: 'Vitamins & Supplements',
      image: '/images/categories/vitamins.jpg',
      icon: '💊',
      color: 'from-orange-400 to-amber-500',
      products: 120,
      description: 'Boost your health with our premium range of vitamins and supplements.'
    },
    {
      id: 2,
      name: 'Pain Relief',
      image: '/images/categories/pain-relief.jpg',
      icon: '🩹',
      color: 'from-red-400 to-rose-500',
      products: 85,
      description: 'Effective solutions for headaches, muscle pain, and joint discomfort.'
    },
    {
      id: 3,
      name: 'Cold & Flu',
      image: '/images/categories/cold-flu.jpg',
      icon: '🤧',
      color: 'from-blue-400 to-cyan-500',
      products: 64,
      description: 'Relief from cough, congestion, and other cold & flu symptoms.'
    },
    {
      id: 4,
      name: 'Skin Care',
      image: '/images/categories/skin-care.jpg',
      icon: '✨',
      color: 'from-pink-400 to-fuchsia-500',
      products: 98,
      description: 'Nourish and protect your skin with our dermatologist-recommended products.'
    },
    {
      id: 5,
      name: 'Baby Care',
      image: '/images/categories/baby-care.jpg',
      icon: '👶',
      color: 'from-sky-400 to-indigo-500',
      products: 76,
      description: 'Gentle and safe products for your baby\'s health and comfort.'
    },
    {
      id: 6,
      name: 'First Aid',
      image: '/images/categories/first-aid.jpg',
      icon: '🚑',
      color: 'from-green-400 to-emerald-500',
      products: 52,
      description: 'Essential supplies for treating minor injuries and emergencies.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('exploreCategories', 'Explore Categories')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('exploreCategoriesSubtitle', 'Browse our wide range of healthcare categories')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-1">
                {/* Category Image with Gradient Overlay */}
                <div className="relative h-48">
                  {/* Placeholder for category image */}
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`}></div>
                  
                  {/* Category Icon */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-3xl shadow-lg">
                    {category.icon}
                  </div>
                  
                  {/* Category Name */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    <p className="text-white text-sm opacity-90">{category.products} {t('products', 'products')}</p>
                  </div>
                </div>
                
                {/* Category Description */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-teal-600 dark:text-teal-400 font-medium">
                    {t('browseCategory', 'Browse Category')}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;