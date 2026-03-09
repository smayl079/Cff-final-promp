// API Version
export const API_VERSION = 'v1';

// API Endpoints
export const ENDPOINTS = {
  // Auth
  LOGIN: `/v1/auth/login`,
  REGISTER: `/v1/auth/register`,
  LOGOUT: `/v1/auth/logout`,
  REFRESH_TOKEN: `/v1/auth/refresh-token`,
  CHANGE_PASSWORD: `/v1/auth/change-password`,
  FORGOT_PASSWORD: `/v1/auth/forgot-password`,

  // Appointments
  APPOINTMENTS: `/v1/appointments`,
  APPOINTMENT_BY_ID: (id) => `/v1/appointments/${id}`,
  MY_APPOINTMENTS: `/v1/appointments/my-appointments`,
  APPOINTMENT_STATUS: (id) => `/v1/appointments/${id}/status`,

  // Customers
  CUSTOMERS: `/v1/customers`,
  CUSTOMER_BY_ID: (id) => `/v1/customers/${id}`,

  // Vehicles
  VEHICLES: `/v1/vehicles`,
  VEHICLE_BY_ID: (id) => `/v1/vehicles/${id}`,
  MY_VEHICLES: `/v1/vehicles/my-vehicles`,

  // Services
  SERVICES: `/v1/services`,
  SERVICE_BY_ID: (id) => `/v1/services/${id}`,
  SERVICES_BY_CATEGORY: (categoryId) => `/v1/services/category/${categoryId}`,

  // Reviews
  REVIEWS: `/v1/reviews`,
  REVIEW_BY_ID: (id) => `/v1/reviews/${id}`,

  // Mechanics
  MECHANICS: `/v1/mechanics`,
  MECHANIC_BY_ID: (id) => `/v1/mechanics/${id}`,

  // Admin
  ADMIN_DASHBOARD: `/v1/admin/dashboard/stats`,
  ADMIN_MESSAGES: `/v1/admin/messages`,
  ADMIN_MESSAGES_READ: (id) => `/v1/admin/messages/${id}/read`,
  ADMIN_SETTINGS: `/v1/admin/settings`,

  // Experts
  EXPERTS: `/v1/experts`,
  EXPERT_BY_ID: (id) => `/v1/experts/${id}`,
};
