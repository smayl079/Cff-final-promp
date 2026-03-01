import axiosInstance from '../axios.config';
import { ENDPOINTS } from '../endpoints';

export const authService = {
  /**
   * Register a new user
   */
  register: async (userData) => {
    const response = await axiosInstance.post(ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  /**
   * Login user
   */
  login: async (credentials) => {
    const response = await axiosInstance.post(ENDPOINTS.LOGIN, credentials);
    
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    
    try {
      await axiosInstance.post(ENDPOINTS.LOGOUT, { refreshToken });
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken) => {
    const response = await axiosInstance.post(ENDPOINTS.REFRESH_TOKEN, {
      refreshToken,
    });
    return response.data;
  },

  /**
   * Change password
   */
  changePassword: async (passwordData) => {
    const response = await axiosInstance.post(ENDPOINTS.CHANGE_PASSWORD, passwordData);
    return response.data;
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email) => {
    const response = await axiosInstance.post(ENDPOINTS.FORGOT_PASSWORD, { email });
    return response.data;
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },
};
