// src/context/ProductDataContext.js
// Live product data: fetches the catalogue from the API when the backend is up,
// falls back to the static bundle otherwise. Admin edits (price/image/etc.)
// made via the API are reflected here on the next refresh.
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { products as staticProducts } from '../data/products';
import { catalogueProducts } from '../data/catalogueProducts';

const ProductDataContext = createContext();

// Map product id -> Arabic display name from the static catalogue (ids 104+).
const AR_NAMES = {};
for (const p of catalogueProducts || []) {
  if (p && p.id != null && p.name) AR_NAMES[String(p.id)] = p.name;
}

const attachArabicNames = (list) =>
  (list || []).map((p) => ({
    ...p,
    nameAr: (p && p.nameAr) || AR_NAMES[String(p && p.id)] || null,
  }));

export const ProductDataProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [products, setProducts] = useState(() => attachArabicNames(staticProducts));
  const [source, setSource] = useState('static');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch('/api/products?limit=5000&page=1', { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error('API returned ' + res.status);
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.items;
      if (Array.isArray(items) && items.length > 0) {
        setProducts(attachArabicNames(items));
        setSource('api');
        setError(null);
      } else {
        throw new Error('Empty catalogue');
      }
    } catch (e) {
      setError(e.message);
      setSource('static');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Re-fetch when admin makes product changes (add/update/delete).
  useEffect(() => {
    let timer;
    const onProductsChanged = () => {
      clearTimeout(timer);
      timer = setTimeout(() => refresh(), 300);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('awon:products-changed', onProductsChanged);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('awon:products-changed', onProductsChanged);
      };
    }
    return undefined;
  }, [refresh]);

  // Products whose names follow the current UI language (Arabic names when lang=ar).
  const lang = i18n?.language || 'en';
  const localizedProducts = useMemo(() => {
    if (lang !== 'ar') return products;
    return products.map((p) => (p.nameAr ? { ...p, name: p.nameAr } : p));
  }, [products, lang]);

  const value = useMemo(() => {
    const getProductsByCategory = (category, subcategory = null) => {
      let filtered = localizedProducts.filter((p) => p.category === category);
      if (subcategory) filtered = filtered.filter((p) => p.subcategory === subcategory);
      return filtered;
    };
    const getFeaturedProducts = () =>
      localizedProducts.filter((p) => (p.rating || 0) >= 4.5).slice(0, 8);
    const getDiscountedProducts = () =>
      localizedProducts.filter((p) => p.discount && p.discount > 0).slice(0, 6);
    const getProduct = (id) =>
      localizedProducts.find((p) => String(p.id) === String(id));

    return {
      products: localizedProducts,
      source,
      loading,
      error,
      refresh,
      getProductsByCategory,
      getFeaturedProducts,
      getDiscountedProducts,
      getProduct,
    };
  }, [localizedProducts, source, loading, error, refresh]);

  return (
    <ProductDataContext.Provider value={value}>
      {children}
    </ProductDataContext.Provider>
  );
};

export const useProducts = () => useContext(ProductDataContext);
