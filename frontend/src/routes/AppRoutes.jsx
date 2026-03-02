import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import MechanicDashboard from '../components/mechanic/MechanicDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<HomePage />} />
      <Route path="/about" element={<HomePage />} />
      <Route path="/contact" element={<HomePage />} />
      <Route path="/booking" element={<HomePage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
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

      {/* Mechanic Routes */}
      <Route path="/mechanic" element={<MechanicDashboard />} />

      {/* 404 Not Found */}
      <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      {/* 404 Not Found */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
