import React, { useState, useEffect, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import LiveVideoBackground from '../../components/LiveVideoBackground';
import { ProductContext } from '../../context/ProductContext';

// Sample brand logos mapping (assuming logos are placed in public/images/brands/)
const brandLogos = {
  NatureMade: '/images/brands/naturemade.png',
  GSK: '/images/brands/gsk.png',
  PharmaMed: '/images/brands/pharmamed.png',
  Comotomo: '/images/brands/comotomo.png',
};

const ProductsPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const { products } = useContext(ProductContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Extract unique categories and brands from products
  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand || 'Other'))];

  // Filter products based on search term and selected filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length > 0 ? selectedCategories.includes(product.category) : true;
    const matchesBrand = selectedBrands.length > 0 ? selectedBrands.includes(product.brand || 'Other') : true;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  // Translate categories and brands keys for filtering display
  const translatedCategories = categories.map(cat => cat);
  const translatedBrands = brands.map(brand => brand);

  // Update search suggestions based on current search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchSuggestions([]);
      return;
    }
    const suggestions = products
      .map((p) => p.name)
      .filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5);
    setSearchSuggestions(suggestions);
  }, [searchTerm, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  // Handle category checkbox toggle
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle brand checkbox toggle
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Ref for search input to handle clicks outside suggestions
  const searchRef = useRef(null);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div>
        <LiveVideoBackground height={800} />
      </div>
      <div style={{ marginTop: 0, paddingTop: 0 }}>
        <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white relative">
          <h1 className="text-3xl font-bold mb-6">{t('ourProducts')}</h1>

          {/* Filter/Search Bar */}
          <div className="sticky top-0 z-30 mb-6 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl shadow-teal-300/40 dark:shadow-none p-8 transform-gpu perspective-1000 relative">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 relative z-10">
              {/* Search Input with autocomplete */}              
              <div className="relative flex-1" ref={searchRef}>
                <input
                  type="text"
                  placeholder={t('searchProducts')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label={t('searchProducts')}
                  className="w-3/4 max-w-md px-3 py-2 border border-teal-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-shadow text-base"
                  autoComplete="off"
                />
                {searchSuggestions.length > 0 && (
                  <ul
                    className="absolute z-40 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded mt-1 max-h-48 overflow-auto shadow-lg"
                    role="listbox"
                    aria-label={t('searchSuggestions')}
                  >
                    {searchSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        role="option"
                        tabIndex={0}
                        className="px-5 py-3 cursor-pointer hover:bg-teal-600 hover:text-white text-lg"
                        onClick={() => {
                          setSearchTerm(suggestion);
                          setSearchSuggestions([]);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSearchTerm(suggestion);
                            setSearchSuggestions([]);
                          }
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Category Multi-select */}
              <fieldset className="flex flex-col space-y-4 mt-6 md:mt-0 max-w-xs" aria-label={t('filterByCategory')}>
                {categories.map((cat, index) => (
                  <label key={cat} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="form-checkbox h-6 w-6 text-teal-600 rounded-md shadow-md hover:scale-110 transition-transform"
                    />
                    <span className="text-lg">{translatedCategories[index]}</span>
                  </label>
                ))}
              </fieldset>

              {/* Brand Multi-select with logos */}
              <fieldset className="flex flex-col space-y-4 mt-6 md:mt-0 border-l border-gray-300 dark:border-gray-700 pl-8 max-w-xs" aria-label={t('filterByBrand')}>
                {brands.map((brand, index) => (
                  <label key={brand} className="flex items-center space-x-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="form-checkbox h-6 w-6 text-teal-600 rounded-md shadow-md hover:scale-110 transition-transform"
                    />
                    {brandLogos[brand] ? (
                      <img
                        src={brandLogos[brand]}
                        alt={`${brand} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <span className="w-10 h-10 flex items-center justify-center text-sm font-semibold text-gray-500 border border-gray-300 rounded">
                        {brand[0]}
                      </span>
                    )}
                    <span className="text-lg">{translatedBrands[index]}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <p className="text-lg">{t('noMatchingProducts') || 'No products found.'}</p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  tabIndex={0}
                  aria-label={`${product.name}, ${t('price')}: ${product.price} SAR`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-contain mb-4 rounded"
                  />
                  <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {product.category}
                  </p>
                  <p className="text-green-600 dark:text-green-400 font-bold mb-2">
                    {product.price} SAR
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-teal-600 hover:bg-teal-700 text-white w-full py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {t('addToCart')}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;