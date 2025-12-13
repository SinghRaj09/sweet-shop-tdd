import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to headers
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

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }

    // Handle 403 Forbidden errors
    if (error.response?.status === 403) {
      console.error('Access forbidden: You do not have permission to access this resource');
    }

    return Promise.reject(error);
  }
);

// Authentication API endpoints
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};

// Sweet API endpoints
export const sweetAPI = {
  // Public endpoints
  getAll: (params) => api.get('/sweets', { params }),
  getById: (id) => api.get(`/sweets/${id}`),
  search: (params) => api.get('/sweets/search', { params }),

  // Protected endpoints
  create: (sweetData) => api.post('/sweets', sweetData),
  update: (id, sweetData) => api.put(`/sweets/${id}`, sweetData),
  delete: (id) => api.delete(`/sweets/${id}`),
  purchase: (id, quantity) => api.post(`/sweets/${id}/purchase`, { quantity }),
  restock: (id, quantity) => api.post(`/sweets/${id}/restock`, { quantity }),
};

export default api;