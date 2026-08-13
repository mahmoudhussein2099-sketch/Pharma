import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MockProductManagement = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    category: 'General',
    image: '/images/products/default-product.png'
  });
  
  // Mock products data
  const [products, setProducts] = useState([
    { _id: '1', name: 'Panadol', price: 15.99, description: 'Pain relief medication', stock: 120, category: 'Pain Relief', image: '/images/products/panadol.png' },
    { _id: '2', name: 'Vitamin C', price: 24.50, description: 'Immune support supplement', stock: 85, category: 'Vitamins', image: '/images/products/vitamin-c.png' },
    { _id: '3', name: 'Cough Syrup', price: 32.75, description: 'For cough and cold relief', stock: 45, category: 'Cold & Flu', image: '/images/products/cough-syrup.png' },
    { _id: '4', name: 'Augmentin', price: 45.00, description: 'Antibiotic medication', stock: 30, category: 'Antibiotics', image: '/images/products/Augmentin.png' },
  ]);

  const categories = [
    'Pain Relief', 'Vitamins', 'Cold & Flu', 'Antibiotics', 
    'Digestive Health', 'First Aid', 'Baby Care', 'General'
  ];

  // Handle form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setForm({
          ...form,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      category: product.category,
      image: product.image
    });
    setImagePreview(product.image);
    setActiveTab('edit');
  };

  // Handle save product (add or update)
  const handleSaveProduct = () => {
    if (activeTab === 'add') {
      // Add new product
      const newProduct = {
        _id: Date.now().toString(),
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock)
      };
      setProducts([...products, newProduct]);
      alert('Product added successfully!');
    } else {
      // Update existing product
      const updatedProducts = products.map(p => 
        p._id === editingProduct._id ? {
          ...p,
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock)
        } : p
      );
      setProducts(updatedProducts);
      alert('Product updated successfully!');
    }
    
    // Reset form and go back to list
    setForm({
      name: '',
      price: '',
      description: '',
      stock: '',
      category: 'General',
      image: '/images/products/default-product.png'
    });
    setImagePreview(null);
    setEditingProduct(null);
    setActiveTab('list');
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('productManagement')}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('list')} 
            className={`px-4 py-2 rounded ${activeTab === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {t('productList')}
          </button>
          <button 
            onClick={() => {
              setEditingProduct(null);
              setForm({
                name: '',
                price: '',
                description: '',
                stock: '',
                category: 'General',
                image: '/images/products/default-product.png'
              });
              setImagePreview(null);
              setActiveTab('add');
            }} 
            className={`px-4 py-2 rounded ${activeTab === 'add' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            {t('addProduct')}
          </button>
        </div>
      </div>

      {activeTab === 'list' && (
        <>
          <div className="mb-4 flex flex-wrap gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder={t('searchProducts')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">{t('allCategories')}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('image')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('name')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('price')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('category')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('stock')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">SAR {product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        {t('edit')}
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this product?')) {
                            setProducts(products.filter(p => p._id !== product._id));
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        {t('delete')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {(activeTab === 'add' || activeTab === 'edit') && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">
            {activeTab === 'add' ? t('addNewProduct') : t('editProduct')}
          </h3>
          
          {/* Image Upload */}
          <div className="mb-6 flex flex-col items-center">
            <div className="w-32 h-32 border rounded-lg overflow-hidden mb-2">
              {imagePreview ? (
                <img src={imagePreview} alt="Product preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">
              {t('uploadImage')}
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange} 
              />
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('productName')}</label>
              <input 
                name="name" 
                value={form.name}
                onChange={handleChange}
                placeholder={t('enterProductName')} 
                className="w-full p-2 border rounded" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('price')}</label>
              <input 
                name="price" 
                type="number" 
                value={form.price}
                onChange={handleChange}
                placeholder={t('enterPrice')} 
                className="w-full p-2 border rounded" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('category')}</label>
              <select 
                name="category" 
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('stock')}</label>
              <input 
                name="stock" 
                type="number" 
                value={form.stock}
                onChange={handleChange}
                placeholder={t('enterStock')} 
                className="w-full p-2 border rounded" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('description')}</label>
              <textarea 
                name="description" 
                value={form.description}
                onChange={handleChange}
                placeholder={t('enterDescription')} 
                className="w-full p-2 border rounded" 
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setActiveTab('list')} 
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            >
              {t('cancel')}
            </button>
            <button 
              onClick={handleSaveProduct}
              className={`px-4 py-2 rounded text-white ${activeTab === 'add' ? 'bg-green-600' : 'bg-blue-600'}`}
            >
              {activeTab === 'add' ? t('addProduct') : t('updateProduct')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockProductManagement;