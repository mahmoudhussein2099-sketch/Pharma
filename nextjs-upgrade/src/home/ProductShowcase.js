import React from 'react';
import { useCart } from '../../context/CartContext';
import { getFeaturedProducts, getDiscountedProducts } from '../../data/products';

const ProductShowcase = () => {
  const { addToCart } = useCart();
  const featuredProducts = getFeaturedProducts();
  const discountedProducts = getDiscountedProducts();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Featured Products Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Top-rated products chosen by our pharmacists</p>
            </div>
            <button className="text-teal-600 hover:text-teal-700 font-medium flex items-center">
              View All
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div 
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">★</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="text-xs text-teal-600 mb-1 font-medium">{product.subcategory}</div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(product.rating) ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="font-bold text-gray-900">SAR {product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-1">
                          SAR {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-2 rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-300 font-medium transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Special Offers</h2>
              <p className="text-purple-100">Limited time discounts on selected products</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎁</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {discountedProducts.map(product => (
              <div 
                key={product.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{product.name}</h3>
                    <p className="text-purple-100 text-sm">{product.subcategory}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-white">SAR {product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-purple-200 line-through ml-2">
                        SAR {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                    -{product.discount}%
                  </div>
                </div>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-white text-purple-600 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;