import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductContext } from '../../context/ProductContext';

const ProductManagement = () => {
  const { t } = useTranslation();
  const { products, addProduct: contextAddProduct, updateProduct: contextUpdateProduct, deleteProduct: contextDeleteProduct } = useContext(ProductContext);
  
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    stock: '', 
    category: 'General',
    image: '/images/products/default-product.png'
  });
  
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    'Pain Relief', 'Vitamins', 'Cold & Flu', 'Antibiotics', 
    'Digestive Health', 'First Aid', 'Baby Care', 'General'
  ];

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // In a real app, you would upload the image to a server
      // For now, we'll just use the preview URL
      setForm({ ...form, image: previewUrl });
    }
  };

  const addProduct = () => {
    const newProduct = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock)
    };
    
    contextAddProduct(newProduct);
    setForm({ 
      name: '', 
      price: '', 
      description: '', 
      stock: '', 
      category: 'General',
      image: '/images/products/default-product.png'
    });
    setImagePreview(null);
    setActiveTab('list');
    
    // Show success message
    alert('Product added successfully!');
  };

  const editProduct = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      category: product.category,
      image: product.image
    });
    setImagePreview(product.image);
    setEditingId(product._id);
    setActiveTab('edit');
  };

  const updateProduct = () => {
    const updatedProduct = { 
      name: form.name,
      price: parseFloat(form.price),
      description: form.description,
      stock: parseInt(form.stock),
      category: form.category,
      image: form.image
    };
    
    contextUpdateProduct(editingId, updatedProduct);
    
    setForm({ 
      name: '', 
      price: '', 
      description: '', 
      stock: '', 
      category: 'General',
      image: '/images/products/default-product.png'
    });
    setImagePreview(null);
    setEditingId(null);
    setActiveTab('list');
    
    // Show success message
    alert('Product updated successfully!');
  };

  const deleteProduct = id => {
    if (confirm('Are you sure you want to delete this product?')) {
      contextDeleteProduct(id);
    }
  };

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
              setEditingId(null);
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
                        onClick={() => editProduct(product)} 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        {t('edit')}
                      </button>
                      <button 
                        onClick={() => deleteProduct(product._id)} 
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
              onClick={activeTab === 'add' ? addProduct : updateProduct} 
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

export default ProductManagement;