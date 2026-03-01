import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import PrivateRoute from './PrivateRoute';

// Public Pages
import Home from '../pages/public/Home/Home';
import Services from '../pages/public/Services/Services';
import About from '../pages/public/About/About';
import Contact from '../pages/public/Contact/Contact';
import NotFound from '../pages/public/NotFound/NotFound';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Customer Pages
import CustomerDashboard from '../pages/customer/Dashboard';
import Booking from '../pages/customer/Booking/Booking';
import MyAppointments from '../pages/customer/Appointments/MyAppointments';
import MyVehicles from '../pages/customer/Vehicles/MyVehicles';

// Admin Pages (to be implemented)
// import AdminDashboard from '../pages/admin/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>

      {/* Customer Protected Routes */}
      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/booking" element={<Booking />} />
        <Route path="/customer/appointments" element={<MyAppointments />} />
        <Route path="/customer/vehicles" element={<MyVehicles />} />
      </Route>

      {/* Admin Protected Routes (to be implemented) */}
      {/* <Route
        element={
          <PrivateRoute roles={['Admin', 'Manager']}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route> */}

      {/* 404 Not Found */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
