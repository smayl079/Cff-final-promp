import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import MechanicDashboard from '../components/mechanic/MechanicDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role?.toLowerCase())) {
    // Redirect to appropriate dashboard based on role
    switch (user?.role?.toLowerCase()) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'mechanic':
        return <Navigate to="/mechanic" replace />;
      case 'customer':
        return <Navigate to="/" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/services" element={<HomePage />} />
      <Route path="/about" element={<HomePage />} />
      <Route path="/contact" element={<HomePage />} />
      <Route path="/booking" element={<HomePage />} />

      {/* Admin Routes - Protected */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="customers" element={<AdminDashboard />} />
        <Route path="mechanics" element={<AdminDashboard />} />
        <Route path="staff" element={<AdminDashboard />} />
        <Route path="vehicles" element={<AdminDashboard />} />
        <Route path="appointments" element={<AdminDashboard />} />
        <Route path="service-categories" element={<AdminDashboard />} />
        <Route path="service-items" element={<AdminDashboard />} />
        <Route path="payments" element={<AdminDashboard />} />
        <Route path="reports" element={<AdminDashboard />} />
        <Route path="communications" element={<AdminDashboard />} />
        <Route path="settings" element={<AdminDashboard />} />
      </Route>

      {/* Mechanic Routes - Protected */}
      <Route 
        path="/mechanic" 
        element={
          <ProtectedRoute allowedRoles={['mechanic']}>
            <MechanicDashboard />
          </ProtectedRoute>
        } 
      />

      {/* 404 Not Found */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
