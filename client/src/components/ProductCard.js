import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  // Extract product details
  const { id, title, name, price, image } = product;
  const productName = title || name;
  
  // Check if product is in wishlist
  const inWishlist = isInWishlist(id);
  
  // Toggle wishlist
  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ ...product, name: productName });
    }
  };
  
  // Add to cart
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...product, name: productName });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img src={image} alt={productName} className="w-full h-40 object-contain p-4" />
        <button 
          onClick={toggleWishlist}
          aria-label={inWishlist ? t('removeFromWishlist', 'Remove from wishlist') : t('addToWishlist', 'Add to wishlist')}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 dark:bg-gray-700/90 shadow hover:bg-white dark:hover:bg-gray-700 transition-colors z-10"
        >
          {inWishlist ? (
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{productName}</h3>
        <p className="text-green-600 dark:text-green-300 font-bold mt-2">
          {typeof price === 'number' ? `SAR ${price.toFixed(2)}` : price}
        </p>
        <button 
          onClick={handleAddToCart}
          aria-label={`${t('addToCart', 'Add to Cart')} ${productName}`}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-colors w-full"
        >
          {t('addToCart', 'Add to Cart')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;