import React from 'react';
import dynamic from 'next/dynamic';

// Import WishlistPage with no SSR to avoid hydration issues
const WishlistPage = dynamic(() => import('../src/pages/user/WishlistPage'), { ssr: false });

export default function Wishlist() {
  return <WishlistPage />;
}