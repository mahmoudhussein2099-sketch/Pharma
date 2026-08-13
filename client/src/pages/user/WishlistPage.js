import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const WishlistPage = () => {
  const { t } = useTranslation();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  
  // If wishlist is empty and we don't have demo data, add some demo products
  useEffect(() => {
    if (wishlistItems.length === 0) {
      setLoading(true);
      // This is just for demo purposes
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [wishlistItems.length]);
  
  const handleAddToCart = (item) => {
    addToCart(item);
    alert(t('addedToCart', 'Item added to cart!'));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('myWishlist', 'My Wishlist')}</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="bg-card rounded-lg shadow p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className="text-xl font-semibold mt-4">{t('wishlistEmpty', 'Your wishlist is empty')}</h2>
          <p className="text-muted-foreground mt-2">{t('wishlistEmptyMessage', 'Browse our products and add items to your wishlist')}</p>
          <Link to="/products" className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90">
            {t('browseProducts', 'Browse Products')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map(item => (
            <div key={item.id} className="bg-card rounded-lg shadow overflow-hidden">
              <div className="relative">
                <img src={item.image || 'https://via.placeholder.com/300x200?text=Product+Image'} alt={item.name} className="w-full h-48 object-cover" />
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute end-2 top-2 bg-card p-1 rounded-full shadow hover:bg-muted"
                >
                  <svg className="w-5 h-5 text-destructive" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-primary font-bold mt-2">SAR {item.price?.toFixed(2) || '0.00'}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`text-sm ${item.inStock ? 'text-success' : 'text-destructive'}`}>
                    {item.inStock !== false ? t('inStock', 'In Stock') : t('outOfStock', 'Out of Stock')}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    disabled={item.inStock === false}
                    className={`px-4 py-2 rounded ${
                      item.inStock !== false 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {t('addToCart', 'Add to Cart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;