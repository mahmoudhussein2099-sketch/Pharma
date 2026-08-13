import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);
  
  // Fetch product data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock product data
      const mockProduct = {
        id: id,
        name: 'Premium Vitamin C Serum',
        price: 29.99,
        discount: 15,
        rating: 4.8,
        reviews: 124,
        stock: 45,
        sku: 'VIT-C-1000',
        category: 'Vitamins & Supplements',
        tags: ['Vitamin C', 'Immune Support', 'Skin Health'],
        description: 'Our Premium Vitamin C Serum is formulated with high-potency vitamin C to support immune health and promote radiant skin. Each serving provides 1000mg of vitamin C with added bioflavonoids for enhanced absorption.',
        details: [
          'Supports immune system function',
          'Promotes collagen production for healthy skin',
          'Powerful antioxidant protection',
          'Non-GMO and gluten-free',
          'No artificial colors or preservatives'
        ],
        usage: 'Take one tablet daily with food or as directed by your healthcare professional.',
        ingredients: 'Vitamin C (as ascorbic acid), Citrus Bioflavonoids, Rose Hips, Acerola Cherry Extract, Microcrystalline Cellulose, Stearic Acid, Croscarmellose Sodium, Silicon Dioxide.',
        images: [
          '/images/products/vitamin-c-1.png',
          '/images/products/vitamin-c-2.png',
          '/images/products/vitamin-c-3.png',
          '/images/products/vitamin-c-4.png'
        ],
        relatedProducts: [
          { id: '2', name: 'Zinc Tablets', price: 14.99, image: '/images/products/zinc.png' },
          { id: '3', name: 'Vitamin D3', price: 19.99, image: '/images/products/vitamin-d.png' },
          { id: '4', name: 'Immune Support Complex', price: 24.99, image: '/images/products/immune-complex.png' }
        ]
      };
      
      setProduct(mockProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  // Handle quantity change
  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity
      });
      
      // Show success message
      alert(t('addedToCart', 'Product added to cart!'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t('productNotFound')}</h2>
          <p className="text-gray-600 dark:text-gray-300">{t('productNotFoundDesc')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm">
          <a href="/" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">{t('home')}</a>
          <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
          <a href="/products" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">{t('products')}</a>
          <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
          <a href={`/products?category=${product.category}`} className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">{product.category}</a>
          <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
          <span className="text-gray-800 dark:text-gray-200">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Images */}
            <div className="p-6 md:p-8">
              {/* Main Image */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-4 h-80 flex items-center justify-center">
                {/* Placeholder for product image */}
                <div className="w-64 h-64 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-6xl">
                  📷
                </div>
              </div>
              
              {/* Image Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((index) => (
                  <div 
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`cursor-pointer border-2 rounded-lg overflow-hidden ${
                      activeImage === index 
                        ? 'border-teal-500 dark:border-teal-400' 
                        : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-20 bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-400 dark:text-gray-500 text-xl">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'}`} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                  {product.rating} ({product.reviews} {t('reviews')})
                </span>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                {product.discount > 0 ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="ml-2 text-lg text-gray-500 dark:text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="ml-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Short Description */}
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>
              </div>
              
              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                    {t('availability')}:
                  </span>
                  {product.stock > 0 ? (
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {t('inStock')} ({product.stock} {t('available')})
                    </span>
                  ) : (
                    <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                      {t('outOfStock')}
                    </span>
                  )}
                </div>
                
                <div className="mt-2 flex items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                    SKU:
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.sku}
                  </span>
                </div>
              </div>
              
              {/* Product Actions */}
              <div>
                {/* Quantity Selector */}
                <div className="flex items-center mb-6">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-4">
                    {t('quantity')}:
                  </span>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 text-center text-gray-800 dark:text-white">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-bold text-lg mb-4 transition-colors disabled:bg-gray-400"
                >
                  {product.stock > 0 ? t('addToCart') : t('outOfStock')}
                </button>
                
                {/* Wishlist Button */}
                <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {t('addToWishlist')}
                </button>
              </div>
              
              {/* Tags */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'description' 
                    ? 'border-b-2 border-teal-500 text-teal-600 dark:text-teal-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {t('description')}
              </button>
              <button 
                onClick={() => setActiveTab('details')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'details' 
                    ? 'border-b-2 border-teal-500 text-teal-600 dark:text-teal-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {t('details')}
              </button>
              <button 
                onClick={() => setActiveTab('ingredients')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'ingredients' 
                    ? 'border-b-2 border-teal-500 text-teal-600 dark:text-teal-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {t('ingredients')}
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'reviews' 
                    ? 'border-b-2 border-teal-500 text-teal-600 dark:text-teal-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {t('reviews')} ({product.reviews})
              </button>
            </div>
            
            <div className="p-6 md:p-8">
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {product.description}
                  </p>
                </div>
              )}
              
              {/* Details Tab */}
              {activeTab === 'details' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                    {t('productDetails')}
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    {product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-4">
                    {t('recommendedUsage')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {product.usage}
                  </p>
                </div>
              )}
              
              {/* Ingredients Tab */}
              {activeTab === 'ingredients' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                    {t('ingredients')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {product.ingredients}
                  </p>
                </div>
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                    {t('customerReviews')}
                  </h3>
                  <div className="flex items-center mb-6">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'}`} 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg font-medium text-gray-800 dark:text-white">
                      {product.rating} out of 5
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {product.reviews} {t('customerReviews')}
                  </p>
                  
                  <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium">
                    {t('writeReview')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('relatedProducts')}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <a 
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="p-4">
                  <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-4xl text-gray-400 dark:text-gray-500">📷</div>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-teal-600 dark:text-teal-400 font-bold">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;