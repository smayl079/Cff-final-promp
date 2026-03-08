import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api/services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = authService.getCurrentUser();
    const token = localStorage.getItem('accessToken');
    
    if (currentUser && token) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // HARDCODED ADMIN BYPASS
    if (credentials.email === 'admin@gmail.com' && credentials.password === 'admin123!') {
      const adminUser = {
        id: 'admin-bypass-001',
        email: 'admin@gmail.com',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'Aka'
      };
      
      localStorage.setItem('accessToken', 'mock-admin-token');
      localStorage.setItem('refreshToken', 'mock-admin-refresh-token');
      localStorage.setItem('user', JSON.stringify(adminUser));
      
      setUser(adminUser);
      setIsAuthenticated(true);
      
      return { user: adminUser, accessToken: 'mock-admin-token' };
    }

    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
