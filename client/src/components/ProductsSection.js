import React, { useContext } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";

const products = [
  {
    id: 101,
    name: "Panadol Extra",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=400&fit=crop&crop=center",
    price: 18.00,
    description: "Advanced pain relief with caffeine boost.",
  },
  {
    id: 102,
    name: "Vitamin C 1000mg",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
    price: 25.00,
    description: "Effervescent tablets for immune support.",
  },
  {
    id: 103,
    name: "Cough Syrup 200ml",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop&crop=center",
    price: 15.00,
    description: "Soothing formula to relieve dry cough.",
  },
];

const ProductsSection = () => {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const toggleWishlist = (e, product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <section className={`py-16 px-6 transition ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <h2 className={`text-3xl font-bold text-center mb-10 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {t('featuredProducts', 'Featured Products')} 💊
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className={`p-6 rounded-xl shadow hover:shadow-xl transition ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
              />
              <button 
                onClick={(e) => toggleWishlist(e, product)}
                className="absolute top-0 right-0 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 shadow hover:bg-white dark:hover:bg-gray-700"
              >
                {isInWishlist(product.id) ? (
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
              </button>
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {product.name}
            </h3>
            <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {product.description}
            </p>
            <p className={`font-bold mb-3 ${darkMode ? 'text-teal-300' : 'text-teal-600'}`}>
              SAR {product.price.toFixed(2)}
            </p>
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition"
            >
              {t('addToCart', 'Add to Cart')}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;