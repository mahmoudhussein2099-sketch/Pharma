import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
        setWishlistItems([]);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  
  // Add item to wishlist
  const addToWishlist = (item) => {
    setWishlistItems(prev => {
      // Check if item already exists in wishlist
      if (prev.some(wishlistItem => wishlistItem.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };
  
  // Remove item from wishlist
  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  // Check if item is in wishlist
  const isInWishlist = (itemId) => {
    return wishlistItems.some(item => item.id === itemId);
  };
  
  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };
  
  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount: wishlistItems.length,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;