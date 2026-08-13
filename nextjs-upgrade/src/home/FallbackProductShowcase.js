import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FallbackProductShowcase = () => {
  const { t } = useTranslation();
  
  // Product data
  const products = [
    {
      id: 1,
      name: 'Premium Vitamin C',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'vitamins',
      rating: 4.8,
      reviews: 124,
      discount: 15,
      isNew: true,
      isBestseller: false,
      description: 'High-potency vitamin C with rose hips for immune support and skin health.'
    },
    {
      id: 2,
      name: 'Advanced Pain Relief',
      price: 18.50,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'medications',
      rating: 4.7,
      reviews: 89,
      discount: 0,
      isNew: false,
      isBestseller: true,
      description: 'Fast-acting formula for headaches, muscle pain, and joint discomfort.'
    },
    {
      id: 3,
      name: 'Sleep Well Melatonin',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'supplements',
      rating: 4.9,
      reviews: 203,
      discount: 10,
      isNew: true,
      isBestseller: false,
      description: 'Natural sleep aid with melatonin and herbal extracts for restful sleep.'
    },
    {
      id: 4,
      name: 'Omega-3 Fish Oil',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'supplements',
      rating: 4.6,
      reviews: 156,
      discount: 20,
      isNew: false,
      isBestseller: false,
      description: 'Pure fish oil supplement for heart health and cognitive function.'
    }
  ];
  
  // Categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'vitamins', name: 'Vitamins' },
    { id: 'supplements', name: 'Supplements' },
    { id: 'medications', name: 'Medications' },
    { id: 'equipment', name: 'Equipment' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('featuredProducts', 'Featured Products')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('featuredProductsSubtitle', 'Discover our selection of premium healthcare products')}
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category.id === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.discount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {t('new', 'New')}
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {t('bestseller', 'Bestseller')}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'}`} 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="text-right">
                      {product.discount > 0 ? (
                        <>
                          <span className="text-gray-400 dark:text-gray-500 line-through text-sm mr-2">
                            ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                          </span>
                          <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <div className="mt-4">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                      {t('addToCart', 'Add to Cart')}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            {t('viewAllProducts', 'View All Products')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FallbackProductShowcase;