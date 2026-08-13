import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import UserSidebar from '../../components/dashboard/UserSidebar';
import { products, getProductsByCategory } from '../../data/products';

const ProductPage = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');

  useEffect(() => {
    setTimeout(() => {
      let filtered = products;
      
      if (category) {
        filtered = getProductsByCategory(category, subcategory);
      }
      
      setFilteredProducts(filtered);
      setLoading(false);
    }, 500);
  }, [category, subcategory]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <div className="flex">
        <UserSidebar />
        <div className="flex-1 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <UserSidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-8 text-sm">
            <Link to="/" className="text-gray-500 hover:text-teal-600">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-900">Products</span>
            {category && (
              <>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-900 capitalize">{category}</span>
              </>
            )}
            {subcategory && (
              <>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-900">{subcategory}</span>
              </>
            )}
          </nav>

          {/* Header with Creative Design */}
          <div className="mb-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {subcategory || (category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products')}
                </h1>
                <p className="text-teal-100 text-lg">
                  {filteredProducts.length} high-quality products found
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">💊</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter & Sort Bar */}
          <div className="mb-8 bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700">Sort by:</span>
                <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                  <option>Name A-Z</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">View:</span>
                <button className="p-2 bg-teal-100 text-teal-600 rounded-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 rounded-lg hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid with Creative Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      -{product.discount}%
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">Out of Stock</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                      {product.subcategory}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(product.rating) ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        SAR {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          SAR {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                      product.inStock 
                        ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 transform hover:scale-105 shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-8">Try browsing other categories from the sidebar</p>
              <Link 
                to="/"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-blue-600 transition-all duration-300"
              >
                Browse All Categories
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;