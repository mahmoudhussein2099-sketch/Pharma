import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    nameKey: "panadolExtra",
    price: 18,
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=400&fit=crop&crop=center",
    badge: "SALE",
  },
  {
    id: 2,
    nameKey: "vitaminC",
    price: 25,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
    badge: "DISCOUNT",
  },
  {
    id: 3,
    nameKey: "coughSyrup",
    price: 30,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop&crop=center",
  },
];

const FeaturedProducts = () => {
  const { t, i18n } = useTranslation();
  const { darkMode } = useContext(ThemeContext);
  const isRTL = i18n.language === "ar";
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`);
  };

  const toggleWishlist = (e, product) => {
    e.stopPropagation();
    const fullProduct = { ...product, name: t(product.nameKey) };
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(fullProduct);
    }
  };

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className={`py-16 px-6 transition ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <h2 className={`text-3xl font-bold text-center mb-10 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {t("ourProducts", "Our Products")} 💊
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className={`cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-xl transition relative ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="relative">
              {product.badge && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  {product.badge}
                </div>
              )}
              <button 
                onClick={(e) => toggleWishlist(e, product)}
                className="absolute top-2 right-2 w-8 h-8 bg-white/90 dark:bg-gray-700/90 rounded-full flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors z-10"
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
              <img
                src={product.image}
                alt={t(product.nameKey)}
                className={`w-full h-48 object-cover ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              />
            </div>
            <div className="p-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {t(product.nameKey, product.nameKey)}
              </h3>
              <p className={`font-medium mt-1 ${darkMode ? 'text-teal-300' : 'text-teal-600'}`}>
                {product.price} SAR
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({ ...product, name: t(product.nameKey) });
                }}
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md w-full transition"
              >
                {t("addToCart", "Add to Cart")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;