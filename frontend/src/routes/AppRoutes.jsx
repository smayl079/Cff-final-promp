import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Register from '../pages/auth/Register';
import ServicesPage from '../pages/ServicesPage';
import ContactPage from '../pages/ContactPage';
import AboutPage from '../pages/AboutPage';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import ServicesManagement from '../components/admin/ServicesManagement';
import BookingManagement from '../components/admin/BookingManagement';
import EmployeesManagement from '../components/admin/EmployeesManagement';
import ExpertsManagement from '../components/admin/ExpertsManagement';
import MessagesManagement from '../components/admin/MessagesManagement';
import SettingsManagement from '../components/admin/SettingsManagement';
import MechanicDashboard from '../components/mechanic/MechanicDashboard';
import MainLayout from '../components/layout/MainLayout';
import CustomerDashboard from '../pages/customer/Dashboard';
import Booking from '../pages/customer/Booking/Booking';
import MyVehicles from '../pages/customer/Vehicles/MyVehicles';
import MyAppointments from '../pages/customer/Appointments/MyAppointments';

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
        return <Navigate to="/customer/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/booking" element={<HomePage />} />

      {/* Customer Routes - Protected */}
      <Route 
        path="/customer" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="booking" element={<Booking />} />
        <Route path="vehicles" element={<MyVehicles />} />
        <Route path="appointments" element={<MyAppointments />} />
      </Route>

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
        <Route path="services" element={<ServicesManagement />} />
        <Route path="bookings" element={<BookingManagement />} />
        <Route path="employees" element={<EmployeesManagement />} />
        <Route path="experts" element={<ExpertsManagement />} />
        <Route path="messages" element={<MessagesManagement />} />
        <Route path="settings" element={<SettingsManagement />} />
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
