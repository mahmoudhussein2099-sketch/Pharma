// src/pages/admin/ProductManagement.js
// Real product management backed by the JSON store API + image upload.
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search, Plus, Pencil, Trash2, RefreshCw, Upload, X, Save,
  ChevronLeft, ChevronRight, ImageOff,
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const CATEGORIES = [
  { value: 'prescription', label: 'Prescription' },
  { value: 'otc', label: 'OTC' },
  { value: 'vitamins', label: 'Vitamins & Supplements' },
  { value: 'baby', label: 'Baby & Maternity' },
  { value: 'beauty', label: 'Beauty & Personal Care' },
  { value: 'medical', label: 'Medical Devices' },
  { value: 'firstaid', label: 'First Aid' },
  { value: 'eye', label: 'Eye Care' },
];

const SUBCATEGORIES = {
  prescription: ['Antibiotics', 'Blood Pressure', 'Diabetes Care', 'General Health', 'Heart Medications', 'Thyroid Medications'],
  otc: ['Allergy Relief', 'Cold & Flu', 'Cough Syrups', 'Digestive Health', 'General Health', 'Pain Relief', 'Sleep Aids'],
  vitamins: ['Iron & B12', 'Multivitamins', 'Omega-3', 'Probiotics', 'Protein Supplements', 'Supplements', 'Vitamin D'],
  baby: ['Baby Formula', 'Baby Skincare', 'Diapers & Wipes', 'Maternity Care'],
  beauty: ['Anti-Aging', 'Body Care', 'Hair Care', 'Oral Care', 'Skincare Products', 'Sunscreen'],
  medical: ['Blood Pressure Monitors', 'Glucose Meters', 'Pulse Oximeters', 'Thermometers'],
  firstaid: ['Bandages & Gauze', 'Face Masks', 'First Aid Kits', 'Hand Sanitizers'],
  eye: ['Contact Lenses', 'Eye Care', 'Eye Drops', 'Lens Solutions', 'Reading Glasses'],
};

const EMPTY_FORM = {
  name: '',
  brand: '',
  sku: '',
  category: 'otc',
  subcategory: 'General Health',
  price: '',
  originalPrice: '',
  discount: '',
  stock: '',
  inStock: true,
  image: '/images/default-product.png',
  description: '',
};

const notifyChanged = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('awon:products-changed'));
  }
};

const ProductManagement = () => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState('list');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.set('limit', String(pageSize));
      params.set('page', String(page));
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (categoryFilter) params.set('category', categoryFilter);
      const data = await adminApi(`/admin/products?${params.toString()}`);
      setProducts(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, categoryFilter, page, pageSize]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const flash = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => {
      const next = { ...f, [name]: type === 'checkbox' ? checked : value };
      if (name === 'category' && SUBCATEGORIES[value]) {
        next.subcategory = SUBCATEGORIES[value][0];
      }
      return next;
    });
  };

  const handleImageFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const data = await adminApi('/admin/products/upload', { method: 'POST', formData: fd });
      setForm((f) => ({ ...f, image: data.url }));
      flash('Image uploaded successfully');
    } catch (err) {
      setImagePreview(null);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setImagePreview(null);
    setEditingId(null);
    setError('');
  };

  const openAdd = () => {
    resetForm();
    setActiveTab('add');
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name || '',
      brand: p.brand || '',
      sku: p.sku || '',
      category: p.category || 'otc',
      subcategory: p.subcategory || SUBCATEGORIES[p.category || 'otc'][0],
      price: p.price != null ? p.price : '',
      originalPrice: p.originalPrice != null ? p.originalPrice : '',
      discount: p.discount != null ? p.discount : '',
      stock: p.stock != null ? p.stock : '',
      inStock: p.inStock !== false,
      image: p.image || '/images/default-product.png',
      description: p.description || '',
    });
    setImagePreview(p.image || null);
    setError('');
    setActiveTab('edit');
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.price === '' || isNaN(Number(form.price))) {
      setError('Product name and a valid price are required');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: form.name,
        brand: form.brand,
        sku: form.sku,
        category: form.category,
        subcategory: form.subcategory,
        price: Number(form.price),
        originalPrice: form.originalPrice !== '' ? Number(form.originalPrice) : undefined,
        discount: form.discount !== '' ? Number(form.discount) : undefined,
        stock: form.stock !== '' ? Number(form.stock) : 0,
        inStock: form.inStock,
        image: form.image,
        description: form.description,
      };
      if (editingId) {
        await adminApi(`/admin/products/${editingId}`, { method: 'PUT', body: payload });
        flash('Product updated successfully');
      } else {
        await adminApi('/admin/products/add', { method: 'POST', body: payload });
        flash('Product added successfully');
      }
      notifyChanged();
      resetForm();
      setActiveTab('list');
      loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (p) => {
    if (!window.confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    try {
      await adminApi(`/admin/products/${p.id}`, { method: 'DELETE' });
      notifyChanged();
      flash('Product deleted successfully');
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Product Management</h2>
          <p className="text-sm text-muted-foreground">
            {total.toLocaleString()} products — changes appear on the storefront instantly
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadProducts}
            className="inline-flex items-center gap-2 rounded bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-4 rounded border border-success/40 bg-success/10 px-4 py-3 text-sm text-success">
          {message}
        </div>
      )}
      {error && activeTab === 'list' && (
        <div className="mb-4 rounded border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {activeTab === 'list' && (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, brand, SKU or ID..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full rounded border border-input bg-background p-2 ps-10 text-sm"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              className="rounded border border-input bg-background p-2 text-sm"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="overflow-hidden rounded-lg bg-card shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-background">
                  <tr>
                    <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">Image</th>
                    <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">Product</th>
                    <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">Price</th>
                    <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">Category</th>
                    <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">Stock</th>
                    <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/40">
                      <td className="px-6 py-3">
                        <div className="h-12 w-12 overflow-hidden rounded border border-border">
                          {p.image && !p.image.startsWith('/images/default') ? (
                            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                              <ImageOff className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <p className="font-medium text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">#{p.id}{p.brand ? ` · ${p.brand}` : ''}</p>
                      </td>
                      <td className="px-6 py-3">
                        <p className="font-semibold text-foreground">SAR {Number(p.price).toFixed(2)}</p>
                        {p.discount > 0 && p.originalPrice > p.price && (
                          <p className="text-xs text-muted-foreground">
                            <span className="line-through">SAR {Number(p.originalPrice).toFixed(2)}</span>{' '}
                            <span className="font-medium text-success">-{p.discount}%</span>
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">
                        {p.category}{p.subcategory ? ` / ${p.subcategory}` : ''}
                      </td>
                      <td className="px-6 py-3 text-sm text-foreground">{p.stock ?? '—'}</td>
                      <td className="px-6 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.inStock === false ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}`}>
                          {p.inStock === false ? 'Out of stock' : 'In stock'}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-primary hover:bg-primary/10"
                          >
                            <Pencil className="h-3 w-3" /> Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(p)}
                            className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-3 w-3" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!loading && products.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-sm text-muted-foreground">
                        No products match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages} · {total} products
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 text-sm disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 text-sm disabled:opacity-40"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {(activeTab === 'add' || activeTab === 'edit') && (
        <form onSubmit={saveProduct} className="rounded-lg bg-card p-6 shadow">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">
              {activeTab === 'add' ? 'Add New Product' : 'Edit Product'}
            </h3>
            <button
              type="button"
              onClick={() => { resetForm(); setActiveTab('list'); }}
              className="inline-flex items-center gap-1 rounded p-2 text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center">
                <div className="mb-3 flex h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-input bg-muted">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-contain" />
                  ) : (
                    <ImageOff className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  {uploading ? 'Uploading...' : 'Upload Image'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageFile} disabled={uploading} />
                </label>
                <p className="mt-2 text-xs text-muted-foreground">or paste an image URL</p>
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="/images/products/..."
                  className="mt-1 w-full rounded border border-input bg-background p-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-foreground">Product Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Vitamin D3 1000 IU"
                  className="w-full rounded border border-input bg-background p-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Brand</label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="e.g. Bayer"
                  className="w-full rounded border border-input bg-background p-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">SKU</label>
                <input
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  placeholder="Auto-generated if empty"
                  className="w-full rounded border border-input bg-background p-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded border border-input bg-background p-2 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Subcategory</label>
                <select
                  name="subcategory"
                  value={form.subcategory}
                  onChange={handleChange}
                  className="w-full rounded border border-input bg-background p-2 text-sm"
                >
                  {(SUBCATEGORIES[form.category] || []).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Price (SAR) *</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full rounded border border-input bg-background p-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Original Price (SAR)</label>
                <input
                  name="originalPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.originalPrice}
                  onChange={handleChange}
                  placeholder="Leave empty for no discount"
                  className="w-full rounded border border-input bg-background p-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Stock</label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded border border-input bg-background p-2 text-sm"
                />
              </div>
              <div className="flex items-end">
                <label className="inline-flex cursor-pointer items-center gap-2 pb-2 text-sm font-medium text-foreground">
                  <input
                    name="inStock"
                    type="checkbox"
                    checked={form.inStock}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-input"
                  />
                  In stock
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-foreground">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Product details, usage, etc."
                  className="w-full rounded border border-input bg-background p-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => { resetForm(); setActiveTab('list'); }}
              className="rounded bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 rounded bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductManagement;
