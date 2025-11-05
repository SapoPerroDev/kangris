import axios from 'axios';

// En producción (Render), usar ruta relativa
// En desarrollo, usar localhost
const API_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.MODE === 'production' 
    ? '/api'  // Render: mismo dominio
    : 'http://localhost:5000/api'  // Desarrollo: localhost
);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getLowStock: () => api.get('/products/alerts/low-stock'),
};

// Sales API
export const salesAPI = {
  getAll: (params) => api.get('/sales', { params }),
  getById: (id) => api.get(`/sales/${id}`),
  create: (data) => api.post('/sales', data),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: (params) => api.get('/analytics/dashboard', { params }),
  getTopProducts: (params) => api.get('/analytics/top-products', { params }),
  getByCategory: (params) => api.get('/analytics/by-category', { params }),
  getByGender: (params) => api.get('/analytics/by-gender', { params }),
  getBySize: (params) => api.get('/analytics/by-size', { params }),
  getByBranch: (params) => api.get('/analytics/by-branch', { params }),
  getSalesTrend: (params) => api.get('/analytics/sales-trend', { params }),
  getRecommendations: () => api.get('/analytics/recommendations'),
};

export default api;
