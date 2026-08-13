import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load products from localStorage on initial render
    const storedProducts = localStorage.getItem('awonProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Default products if none in localStorage
      const defaultProducts = [
        { _id: '1', name: 'Panadol', price: 15.99, description: 'Pain relief medication', stock: 120, category: 'Pain Relief', image: '/images/products/panadol.png' },
        { _id: '2', name: 'Vitamin C', price: 24.50, description: 'Immune support supplement', stock: 85, category: 'Vitamins', image: '/images/products/vitamin-c.png' },
        { _id: '3', name: 'Cough Syrup', price: 32.75, description: 'For cough and cold relief', stock: 45, category: 'Cold & Flu', image: '/images/products/cough-syrup.png' },
      ];
      setProducts(defaultProducts);
      localStorage.setItem('awonProducts', JSON.stringify(defaultProducts));
    }
    setLoading(false);
  }, []);

  // Add a new product
  const addProduct = (product) => {
    const newProduct = {
      _id: Date.now().toString(),
      ...product
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('awonProducts', JSON.stringify(updatedProducts));
    return newProduct;
  };

  // Update an existing product
  const updateProduct = (id, updatedProduct) => {
    const updatedProducts = products.map(product => 
      product._id === id ? { ...product, ...updatedProduct } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('awonProducts', JSON.stringify(updatedProducts));
  };

  // Delete a product
  const deleteProduct = (id) => {
    const updatedProducts = products.filter(product => product._id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('awonProducts', JSON.stringify(updatedProducts));
  };

  // Get a product by ID
  const getProduct = (id) => {
    return products.find(product => product._id === id);
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      loading, 
      addProduct, 
      updateProduct, 
      deleteProduct, 
      getProduct 
    }}>
      {children}
    </ProductContext.Provider>
  );
};