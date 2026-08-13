import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Products API
export const productsApi = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
  getFeatured: () => api.get('/products/featured'),
  search: (query) => api.get(`/products/search?q=${query}`)
};

// Categories API
export const categoriesApi = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`)
};

// Orders API
export const ordersApi = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post('/orders', orderData),
  update: (id, orderData) => api.put(`/orders/${id}`, orderData),
  cancel: (id) => api.put(`/orders/${id}/cancel`)
};

// Prescriptions API
export const prescriptionsApi = {
  getAll: () => api.get('/prescriptions'),
  getById: (id) => api.get(`/prescriptions/${id}`),
  upload: (formData) => api.post('/prescriptions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  delete: (id) => api.delete(`/prescriptions/${id}`)
};

// Auth API
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData)
};

// User API
export const userApi = {
  getWishlist: () => api.get('/user/wishlist'),
  addToWishlist: (productId) => api.post('/user/wishlist', { productId }),
  removeFromWishlist: (productId) => api.delete(`/user/wishlist/${productId}`),
  getAddresses: () => api.get('/user/addresses'),
  addAddress: (address) => api.post('/user/addresses', address),
  updateAddress: (id, address) => api.put(`/user/addresses/${id}`, address),
  deleteAddress: (id) => api.delete(`/user/addresses/${id}`)
};

export default api;